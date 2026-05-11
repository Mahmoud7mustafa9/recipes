import { User } from "../../../database/models/userSchema.js";
import bcrypt  from 'bcrypt';
const signUp = async (req,res) =>{
try{
    const data = new User(req.body)

    await data.save()


    res.status(200).json({message:"user created :)", data })
}
catch{ (err)=>{
    res.status(400).json({message:"something is wrong ", err})
}}
}

const signIn = async (req,res)=>{

const isExist =await User.findOne({email:req.body.email});

if(isExist){
// check the password
const rightPass = await bcrypt.compare(req.body.password,isExist.password);

if (rightPass){

    res.status(200).json({message:"signed in with token"})
}
else{
    res.status(404).json({message:"wrong password "})
}

}
else {
    res.status(404).json({message:"email is not found"})
}

}


export {
    signUp ,
    signIn ,
}