import { User } from "../../../database/models/userSchema.js";
import bcrypt  from 'bcrypt';
import { catchError } from "../../middlewares/catchError.js";
import { AppError } from "../../utils/AppError.js";


const signUp = catchError(async (req,res) =>{

    const data = new User(req.body)

    await data.save()

    res.status(200).json({message:"user created :)", data })
})


const signIn = catchError(async (req,res,next)=>{

const isExist =await User.findOne({email:req.body.email});

if(isExist && bcrypt.compare(req.body.password,isExist.password) ){

    res.status(200).json({message:"signed in with token"})
}
else{
    next(new AppError("wrong password or email", 404))
}

})



export {
    signUp ,
    signIn ,
}