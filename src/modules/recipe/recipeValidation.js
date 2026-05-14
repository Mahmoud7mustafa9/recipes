import Joi from "joi";

export const addReceipeValidation = Joi.object({
  title: Joi.string().min(3).required(),
  description: Joi.string().min(10).required(),
  ingredients: Joi.array().items(Joi.string().min(1)).min(2).required(),
  category: Joi.string().length(24).required(),
  createdBy: Joi.string().length(24).required(),
  image: Joi.string(),
  price: Joi.number().positive().required()
});


export const updateReceipeValidation = Joi.object({
      title: Joi.string().min(3).required(),
  description: Joi.string().min(10).required(),
  ingredients: Joi.array().items(Joi.string().min(1)).min(2).required(),
  category: Joi.string().length(24).required(),
  createdBy: Joi.string().length(24).required(),
  image: Joi.string(),
  price: Joi.number().positive().required()
})