import { Recipe } from "../../../database/models/recipeSchema.js";
import { catchError } from "../../middlewares/catchError.js";
import { AppError } from "../../utils/AppError.js";
import fs from "fs";
import path from "path";


export const addRecipe = catchError(async (req, res, next) => {
  if (!req.file) {
    return next(new AppError("Image is required", 400));
  }

  const { title, description, ingredients, category, price } = req.body;
  const createdBy = req.user._id;

  const data = new Recipe({
    title,
    description,
    ingredients,
    category,
    price,
    createdBy,
    image: req.file.filename,
  });

  await data.save();

  res.status(201).json({
    message: "Recipe created",
    data,
  });
});

export const getAllRecipes = catchError(async (req, res, next) => {

let filter = {}

if (req.query.search){
  filter.title = {$regex:req.query.search,$options:"i"}
}
if (req.query.category){ 
  filter.category = req.query.category
}


let pageNumber = req.query.page * 1 || 1
if (pageNumber < 1) pageNumber = 1

let limit = req.query.limit * 1 || 1

let skip = (pageNumber - 1 ) * limit


const data = await Recipe.find(filter).skip(skip).limit(limit)
    .populate("user")
    .populate("category" , "name -_id");

  if (!data || data.length === 0) {
    return next(new AppError("No recipes found", 404));
  }

  res.status(200).json(data);
});

export const getOneRecipe = catchError(async (req, res, next) => {
  const data = await Recipe.findById(req.params.id)
    .populate("user")
    .populate("category");

  if (!data) {
    return next(new AppError("Recipe not found", 404));
  }

  res.status(200).json(data);
});

export const updateRecipe = catchError(async (req, res, next) => {
  const recipe = await Recipe.findById(req.params.id);

  if (!recipe) {
    return next(new AppError("Recipe not found", 404));
  }

  if (req.file) {
    if (recipe.image) {
      const oldImagePath = path.join(
        "uploads/recipes",
        path.basename(recipe.image)
      );

      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }

    req.body.image = req.file.filename;
  }

  const updated = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json({
    message: "Updated",
    data: updated,
  });
});

export const deleteRecipe = catchError(async (req, res, next) => {
  const deleted = await Recipe.findByIdAndDelete(req.params.id);

  if (!deleted) {
    return next(new AppError("Recipe not found", 404));
  }

  if (deleted.image) {
    const imagePath = path.join(
      "uploads/recipes",
      path.basename(deleted.image)
    );

    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }
  }

  res.status(200).json({
    message: "Recipe deleted",
  });
});