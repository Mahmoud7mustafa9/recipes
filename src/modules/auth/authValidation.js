import Joi from "joi"

const signUpValidation = Joi.object({
    name : Joi.string().min(3).required(),
    email : Joi.string().email().required(),
    password: Joi.string().pattern(/^[a-zA-Z0-9]{6,40}$/).required(),
    repassword: Joi.valid(Joi.ref("password")).required(),
    age : Joi.number().min(12).required(),
}).unknown(false);

const signInValidation = Joi.object({

    email : Joi.string().email().required(),
    password: Joi.string().pattern(/^[a-zA-Z0-9]{6,40}$/).required(),

})
const forgetPassValidation = Joi.object({

    email : Joi.string().email().required(),

})
const verifyOtpValidation = Joi.object({

    email : Joi.string().email().required(),
    otp: Joi.string().length(6).required(),

})
const resetPassValidation = Joi.object({

    email : Joi.string().email().required(),
    password: Joi.string().pattern(/^[a-zA-Z0-9]{6,40}$/).required(),

})

export {

    signUpValidation,
    signInValidation,
    forgetPassValidation,
    verifyOtpValidation,
    resetPassValidation,
}

// ex: Sign Up Validation
// Validate:
// name
// email
// password
// Rules
// name:
// required
// minimum 3 characters
// email:
// required
// valid email
// password:
// required
// minimum 6 characters
// Sign In Validation
