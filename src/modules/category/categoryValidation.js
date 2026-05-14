import Joi from "joi";


const addValidation = Joi.object({
    name : Joi.string().min(3).required(),
})

const updateValidation = Joi.object({

   name : Joi.string().min(3).required(),
})


export {

    addValidation,
    updateValidation,
}
