import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";
const userSchema = new Schema (
    {
        name :{
            type : String,
           required: true,
        trim : true
        },

        email :{
            type : String,
           required: true,
           unique: true,
        },
password :{
            type : String,
           required: true,
             select: false
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
    },{
 timestamps: true, 
versionKey: false ,
    })

userSchema.index({email:1})

userSchema.set("toJSON" , {
    transform: (doc,ret)=>{
     console.log(doc);
     delete ret.password

    }
})

userSchema.pre("save",async function(){

     this.password = await bcrypt.hash(this.password,8);
})

export const User = model("user", userSchema);