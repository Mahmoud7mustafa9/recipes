import mongoose from "mongoose";
import dotenv from "dotenv";


dotenv.config();

const ConnectDB = ()=> {

    mongoose.connect(process.env.DB_LINK);

    console.log("DB connected ///")
}
export default ConnectDB ;