import Joi from "joi";

export const addRecipeValidation = Joi.object({
  title: Joi.string().min(3).required(),
  description: Joi.string().min(10).required(),
  ingredients: Joi.array().items(Joi.string().min(1)).min(2).required(),
  category: Joi.string().hex().length(24).required(),
  createdBy: Joi.string().hex().length(24).required(),
image: Joi.object({
  fieldname: Joi.string().required(),
  originalname: Joi.string().required(),
  encoding: Joi.string().required(),
  mimetype: Joi.string().valid("image/jpeg", "image/png", "image/jpg").required(),
  size: Joi.number().max(5 * 1024 * 1024).required(), 
  destination: Joi.string(),
  filename: Joi.string(),
  path: Joi.string()
}),
  price: Joi.number().positive().required()
});


export const updateRecipeValidation = Joi.object({
      title: Joi.string().min(3),
  description: Joi.string().min(10),
  ingredients: Joi.array().items(Joi.string().min(1)).min(2),
  image: Joi.object({
  fieldname: Joi.string().required(),
  originalname: Joi.string().required(),
  encoding: Joi.string().required(),
  mimetype: Joi.string().valid("image/jpeg", "image/png", "image/jpg").required(),
  size: Joi.number().max(5 * 1024 * 1024).required(), 
  destination: Joi.string(),
  filename: Joi.string(),
  path: Joi.string()
}),
  price: Joi.number().positive(),
  id: Joi.string().hex().length(24)
});


export const deleteRecipeValidation = Joi.object({
  id: Joi.string().hex().length(24)
});



