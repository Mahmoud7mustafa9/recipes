import jwt, { decode } from "jsonwebtoken";
import { AppError } from "../utils/AppError";

export const verifyToken = (req,res,next)=> {

    let {token} = req.headers;

if (!token) return next(new AppError("No token provided", 401));

jwt.verify(token,"signInUser",(Error, decoded)=>{

    if(Error){
        next(new AppError(Error,401))
    }

    else{

        req.user = decoded;

        next()
    }
}

)
}