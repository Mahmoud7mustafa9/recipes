import mongoose from "mongoose";
import dotenv from "dotenv";


dotenv.config();

const ConnectDB = ()=> {
      mongoose.connect(process.env.DB_LINK).then(()=>{

    console.log("DB connected ///")
})
.catch((err)=>{console.log("errr",err)}) 
}
export default ConnectDB ;