import { User } from "../../../database/models/userSchema.js";


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

export {
    signUp ,
}