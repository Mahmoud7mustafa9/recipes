import { Router } from "express";
import { signUp , signIn} from "./authController.js";
import { checkEmail } from "../../middlewares/checkEmail.js";

const authRouter = Router();

authRouter.post("/signup",checkEmail, signUp)
authRouter.post("/signin", signIn)



export{
    authRouter ,
}