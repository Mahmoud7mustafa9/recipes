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
           required: true,
           unique: true,
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
    },{
        
            timestamps:{
                createdAt: "MyDate",
                updatedAt : false
            },
versionKey: false ,


    })

// userSchema.index({email:1})

// userSchema.set("toJSON" , {
//     transform: (doc,ret)=>{
//      console.log(doc);
//      delete ret.password

//     }
// })

export const User = model("user", userSchema);