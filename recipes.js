import express from "express";
import ConnectDB from "./database/DBconnection.js";
import  dotenv  from 'dotenv';
import { UseRouter } from "./src/modules/user/userRouter.js";
import recipeRouter from "./src/modules/recipe/recipe.router.js";
import favRouter from "./src/modules/favorites/fav.router.js";
import categoryRouter from "./src/modules/category/categoryrouter.js";
import { authRouter } from "./src/modules/auth/authRouter.js";
const app = express();
const port = process.env.PORT|| 3000 

dotenv.config() ;

app.use(express.json())
app.use(express.static("uploads"))


app.use("/user",UseRouter)
app.use("/recipe",recipeRouter)
app.use("/fav",favRouter)
app.use("/categories",categoryRouter)
app.use("/auth",authRouter)



const start = async ()=> {
try {
await ConnectDB();
app.listen(port, ()=> {
    console.log(`the app listening at ${port} ...`)
})}
catch {(err)=>{
console.log (err , "not onnected ?")
}}


}
start();
