import { Router } from "express";
import { signUp } from "./authController.js";
import { checkEmail } from "../../middlewares/checkEmail.js";

const authRouter = Router();

authRouter.post("/",checkEmail, signUp)



export{
    authRouter ,
}