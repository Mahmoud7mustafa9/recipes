import Joi from "joi"

const signUpValidation = Joi.object({
    name : Joi.string().min(3).required(),
    email : Joi.string().email().required(),
    password: Joi.string().pattern(/^[a-zA-Z0-9]{6,40}$/).required(),
    repassword: Joi.valid(Joi.ref("password")).required(),
    age : Joi.number().min(12).required()
})

const signInValidation = Joi.object({

   name : Joi.string().min(3).required(),
    email : Joi.string().email().required(),
    password: Joi.string().pattern(/^[a-zA-Z0-9]{6,40}$/).required(),
    repassword: Joi.valid(Joi.ref("password")).required(),

})


export {

    signUpValidation,
    signInValidation,
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
