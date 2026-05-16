import Joi from "joi";

export const addFavValidation = Joi.object({
    user: Joi.string().hex().length(24),
    recipe:Joi.string().hex().length(24).required(),
})

export const deleteFavValidation = Joi.object({
 id:Joi.string().hex().length(24).required() 
})