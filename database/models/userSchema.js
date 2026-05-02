import { model, Schema } from "mongoose";

const userSchema = new Schema (
    {
        name :{
            type : String,
           required: true,
        trim : true
        },

        email :{
            type : String,
           required: true
        },
password :{
            type : String,
           required: true
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