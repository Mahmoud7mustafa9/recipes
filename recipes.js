import express from "express";
import ConnectDB from "./database/DBconnection.js";
import  dotenv  from 'dotenv';

const app = express();
const port = process.env.PORT|| 3000 

dotenv.config() ;

app.get("/",(req,res)=>{
    res.send ("heloo >>>>")
})


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
