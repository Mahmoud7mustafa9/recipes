import { model, Schema } from "mongoose";

const userSchema = new Schema (
    {
        name :{
            type : String,
            require : true,
        trim : true
        },

        email :{
            type : String,
            require : true
        },
password :{
            type : String,
            require : true
        },
status :{
            type : String,
            enum : ["active", "inactive"],
            default : "active"
        },
role :{
            type : String,
            enum : ["admin", "user"],
            default : "user"
        },
otp :{
            type : String,
           
        },
        otpExpire : Date ,
    }
)

export const User = model("user", userSchema);