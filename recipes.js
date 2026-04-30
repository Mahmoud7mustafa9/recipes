import express from "express";

import ConnectDB from "./database/DBconnection.js";

const app = express();
const port = 3000

app.get("/",(req,res)=>{
    res.send ("heloo >>>>")
})


const start = async ()=> {

await ConnectDB ();

app.listen(port , ()=> {
    console.log(`the app listening at ${port} ...`)
})
}
start();
