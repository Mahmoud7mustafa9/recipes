import { Router } from "express";
import { signUp , signIn, forgetPassword, verifyOtp} from "./authController.js";
import { checkEmail } from "../../middlewares/checkEmail.js";
import { forgetPassValidation, resetPassValidation, signInValidation , signUpValidation, verifyOtpValidation } from "./authValidation.js";
import { validate } from "../../middlewares/validator.js";


const authRouter = Router();

authRouter.post("/signup",validate(signUpValidation),checkEmail, signUp)
authRouter.post("/signin", validate(signInValidation),signIn)
authRouter.post("/forgetPass",validate(forgetPassValidation),forgetPassword )
authRouter.post("/verifyotp",validate(verifyOtpValidation),verifyOtp)
authRouter.post("/resetpass",validate(resetPassValidation),)



export{
    authRouter ,
}