import mongoose from "mongoose";

const ConnectDB = ()=> {
      mongoose.connect("mongodb://127.0.0.1:27017/recipesDb").then(()=>{

    console.log("DB connected ///")
})
.catch((err)=>{console.log("errr",err)}) 
}
export default ConnectDB ;