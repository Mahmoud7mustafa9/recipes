import { User } from "../../../database/models/userSchema.js";
import bcrypt from "bcrypt"

// { addUser ,getAllUsers,getOneUsers ,updateUser ,deleteUser }

const addUser = async(req,res) => {

    req.body.password = bcrypt.hashSync(req.body.password,8);

    let data = new User(req.body);


    await data.save()

    // already saved so hide the password from returned data beLoW >>

    data.password = undefined ;

res.status(200).json({message: "user created" , data})
}


const getAllUsers = async(req,res)=>{

    let data = await User.find()
    res.status(200).json(data);
}

const getOneUser = async(req,res)=>{

let id = req.params.id;

let data = await User.findById(id)

    res.status(200).json({message:"success" , data });
}

const updateUser = async(req,res)=>{

let id = req.params.id;

let data = await User.findByIdAndUpdate (id ,req.body,{new:true})

    res.status(200).json({message:"success" , data });
}

const deleteUser = async(req,res)=>{

let id = req.params.id;

let data = await User.findByIdAndDelete(id)

    res.status(200).json({message:"deleted successfully"});
}




export { addUser ,getAllUsers , getOneUser,updateUser, deleteUser}