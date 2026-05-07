import express from "express";
import {
  addRecipe,
  getAllRecipes,
  getOneRecipe,
  updateRecipe,
  deleteRecipe
} from "./recipecontroller.js";
import { uploadSingleFile } from "../../utils/upload.js";

const recipeRouter = express.Router();

recipeRouter.post("/",uploadSingleFile("image"), addRecipe);
recipeRouter.get("/", getAllRecipes);
recipeRouter.get("/:id", getOneRecipe);
recipeRouter.put("/:id", updateRecipe);
recipeRouter.delete("/:id", deleteRecipe);

export default recipeRouter;