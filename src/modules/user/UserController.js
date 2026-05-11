import { User } from "../../../database/models/userSchema.js";
import { catchError } from "../../middlewares/catchError.js";
import { AppError } from "../../utils/AppError.js";
import bcrypt from "bcrypt";

export const addUser = catchError(async (req, res, next) => {
  const data = new User(req.body);

  await data.save();

  // hide password before sending response
  data.password = undefined;

  res.status(201).json({
    message: "User created",
    data,
  });
});

export const getAllUsers = catchError(async (req, res, next) => {
  const data = await User.find();

  if (!data || data.length === 0) {
    return next(new AppError("No users found", 404));
  }

  res.status(200).json({
    message: "success",
    data,
  });
});

export const getOneUser = catchError(async (req, res, next) => {
  const data = await User.findById(req.params.id);

  if (!data) {
    return next(new AppError("User not found", 404));
  }

  res.status(200).json({
    message: "success",
    data,
  });
});

export const updateUser = catchError(async (req, res, next) => {
  const data = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!data) {
    return next(new AppError("User not found", 404));
  }

  res.status(200).json({
    message: "Updated successfully",
    data,
  });
});

export const deleteUser = catchError(async (req, res, next) => {
  const data = await User.findByIdAndDelete(req.params.id);

  if (!data) {
    return next(new AppError("User not found", 404));
  }

  res.status(200).json({
    message: "Deleted successfully",
  });
});