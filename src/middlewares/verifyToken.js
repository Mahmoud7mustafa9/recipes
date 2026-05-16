import jwt, { decode } from "jsonwebtoken";
import { AppError } from "../utils/AppError";

export const verifyToken = (req,res,next)=> {
    let {token} = req.headers;

jwt.verify(token,"signInUser",(Error, decoded)=>{

    if(Error){
        next(new AppError(Error,400))
    }

    else{

        req.user = decoded;
        next()
    }
}

)
}