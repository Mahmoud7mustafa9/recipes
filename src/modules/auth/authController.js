import { User } from "../../../database/models/userSchema.js";
import bcrypt  from 'bcrypt';
import { catchError } from "../../middlewares/catchError.js";
import { AppError } from "../../utils/AppError.js";
import jwt from "jsonwebtoken"
import nodemailer from "nodemailer"

const signUp = catchError(async (req,res) =>{
const { name, email, password } = req.body;

const data = new User({ name, email, password });

    await data.save()

    res.status(201).json({ message: "User created successfully", data: { name: data.name, email: data.email } });
})


const signIn = catchError(async (req,res,next)=>{

const isExist = await User.findOne({email:req.body.email}).select("+password");

if (!isExist) return next(new AppError("Wrong email", 401));

const isMatch = await bcrypt.compare(req.body.password, isExist.password);

if( isExist && isMatch ){

jwt.sign({id:isExist._id,name:isExist.name,role:isExist.role},process.env.JWT_SECRET,(error,token)=>{

res.status(200).json({message:"signed in with token",token})
})
    
}
else{
    next(new AppError("wrong password or email", 401))
}

})

const protectedRoutes = catchError(async(req,res,next)=>{

    let payload = jwt.verify(token , process.env.JWT_SECRET)

    let user = await User.findById(payload.id)

    if(!user) return next(new AppError("user is not found",404))

    req.user = user

    if(user.passwordChangedAt) {

        let changeTime = parseInt(user.passwordChangedAt.getTime()/1000,10)

        if (payload.iat < changeTime) return next(new AppError("your token expired please login again "))
    }
    next()
})


const allowTo = (...roles) =>{

return catchError(async(req,res,next)=>{

if (roles.includes(req.user.role)) return next()

return next(new AppError("you are not allowed to do this", 400))    
})
}

const forgetPassword = catchError(async(req,res,next)=>{

const {email} = req.body;

let isExist = User.findOne({email:email});

if(!isExist) return next(new AppError("user is not found" , 404))

const generatedOtp = 1000 + Math.floor(Math.random()*900000).toString();

let salt = bcrypt.genSalt(8);

isExist.otp = await bcrypt.hash(generatedOtp,salt);

isExist.otpExpire = Date.now() +  10 * 60 * 1000 ;

isExist.isOtpVerified = false;

await isExist.save()

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const info = await transporter.sendMail({

    from: `recipe project team ${process.env.SMTP_USER}`, // sender address
    to: isExist.email , // list of recipients
    subject: "your otp valid for 10 mins", // subject line
    text: `your otp is ${generatedOtp}`, // plain text body
     });

  res.status(200).json({message:"success otp"})



})

const verifyOtp = catchError(async(req,res,next)=>{

let {email,otp} = req.body

let user =await User.findOne({email});
if(!user) return next(new AppError("user not found" , 404))
if(Date.now() > user.otpExpire) return next(new AppError("your otp is expired please try again .." , 400))
let match = await bcrypt.compare(otp,user.otp)
if(!match) return next(new AppError("your otp is not right >>>" , 400))

user.isOtpVerified = true;
    await user.save()
res.status(200).json({message:"success", description :"your otp is correct you can now change your password >>"})    
}) 


const resetPassword = catchError(async(req,res,next)=>{

let {email, password} = req.body ;

let user = User.findOne({email});
if(!user) return next(new AppError("user not found" , 404))
if(!user.isOtpVerified) return next(new AppError("please verify with your otp first" , 404));

user.password = password ;

user.otp = undefined;
user.otpExpire = undefined;        
user.passwordChangedAt= Date.now();
user.isOtpVerified =false;

await user.save();
res.status(200).json({message:"success", description :"password reseted successfully ! you can log in now "})
})


export {
    signUp ,
    signIn ,
protectedRoutes,
allowTo, 
forgetPassword,
verifyOtp

}