import { User } from "../../../database/models/userSchema.js";
import bcrypt  from 'bcrypt';
import { catchError } from "../../middlewares/catchError.js";
import { AppError } from "../../utils/AppError.js";
import jwt from "jsonwebtoken"


const signUp = catchError(async (req,res) =>{
const { name, email, password } = req.body;

const data = new User({ name, email, password });

    await data.save()

    res.status(201).json({ message: "User created successfully", data: { name: data.name, email: data.email } });
})


const signIn = catchError(async (req,res,next)=>{

const isExist = await User.findOne({email:req.body.email}).select("+password");
const isMatch = await bcrypt.compare(req.body.password, isExist.password);

if( isExist && isMatch ){

jwt.sign({id:isExist._id,name:isExist.name,role:isExist.role},"signInUser",(error,token)=>{
res.status(201).json({message:"signed in with token",token})
})
    
}
else{
    next(new AppError("wrong password or email", 401))
}

})



export {
    signUp ,
    signIn ,
}