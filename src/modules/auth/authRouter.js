import { Router } from "express";
import { signUp , signIn, forgetPassword} from "./authController.js";
import { checkEmail } from "../../middlewares/checkEmail.js";
import { signInValidation , signUpValidation } from "./authValidation.js";
import { validate } from "../../middlewares/validator.js";


const authRouter = Router();

authRouter.post("/signup",validate(signUpValidation),checkEmail, signUp)
authRouter.post("/signin", validate(signInValidation),signIn)
authRouter.post("/forgetPass",forgetPassword )



export{
    authRouter ,
}