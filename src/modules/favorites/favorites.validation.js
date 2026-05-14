import Joi from "joi";

export const addFavValidation = Joi.object({
    user: Joi.string().length(24).required(),
    recipe:Joi.string().length(24).required(),
})