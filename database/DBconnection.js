import mongoose from "mongoose";
import dotenv from "dotenv";
import { catchError } from "../src/middlewares/catchError";
import { User } from "./models/userSchema.js";


dotenv.config();

const ConnectDB = ()=> {

    mongoose.connect(process.env.DB_LINK);

    console.log("DB connected ///");
    seedAdmin();
}
export default ConnectDB ;


const seedAdmin = catchError(async(req,res,next)=>{


let admin = await User.findOne({role:"admin"});

    if(!admin){
       await  User.create ( {
        name: "mahmoud",
        email:process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
        role: "admin"
       })
    
    console.log("admin created >>>")
    
    }
})