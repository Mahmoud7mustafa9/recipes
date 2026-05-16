import Joi from 'joi';

export const addUserValidation = Joi.object({
    
  name: Joi.string().trim().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().pattern(/^[a-zA-Z0-9]{6,40}$/).required(),
  status: Joi.string().valid("active", "inactive"),
  role: Joi.string().valid("admin", "user"),
  otp: Joi.string(),
  otpExpire: Joi.date()
}).unknown(false);


export const updateUserValidation = Joi.object({
    
  name: Joi.string().trim().min(3).max(50),
  email: Joi.string().email(),
  password: Joi.string().pattern(/^[a-zA-Z0-9]{6,40}$/),
  status: Joi.string().valid("active", "inactive"),
  role: Joi.string().valid("admin", "user"),
  otp: Joi.string(),
  otpExpire: Joi.date()
});