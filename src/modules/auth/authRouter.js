import { Router } from "express";
import { signUp , signIn} from "./authController.js";
import { checkEmail } from "../../middlewares/checkEmail.js";
import { signInValidation , signUpValidation } from "./authValidation.js";
import { validator } from "../../middlewares/validator.js";


const authRouter = Router();

authRouter.post("/signup",validator(signUpValidation),checkEmail, signUp)
authRouter.post("/signin", validator(signInValidation),signIn)



export{
    authRouter ,
}