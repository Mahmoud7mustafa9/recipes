import { User } from "../../database/models/userSchema.js";

const checkEmail = async(req,res,next) => {

    let isExist = await User.findOne({email:req.body.email});

    if(isExist) return res.status(500).json({message:"email is already exist >>"});

     req.body.password =await bcrypt.hash(req.body.password,8);

    next();
    
}

export { checkEmail }