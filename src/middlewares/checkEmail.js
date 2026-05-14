import { User } from "../../database/models/userSchema.js";

const checkEmail = async(req,res,next) => {

    let isExist = await User.findOne({email:req.body.email});

    if(isExist) return res.status(409).json({message:"email is already exist >>"});

    next();
    
}

export { checkEmail }