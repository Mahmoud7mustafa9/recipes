import express from "express";
import {addRecipe,getAllRecipes, getOneRecipe,updateRecipe,deleteRecipe} from "./recipecontroller.js";
import { uploadSingleFile } from "../../utils/upload.js";
import { validate } from "../../middlewares/validator.js";
import { addRecipeValidation , updateRecipeValidation , deleteRecipeValidation } from "./recipeValidation.js";


const recipeRouter = express.Router();

recipeRouter.post("/",uploadSingleFile("image"),validate(addRecipeValidation), addRecipe);
recipeRouter.get("/", getAllRecipes);
recipeRouter.get("/:id", getOneRecipe);
recipeRouter.put("/:id",uploadSingleFile("image"),validate(updateRecipeValidation), updateRecipe);
recipeRouter.delete("/:id", validate(deleteRecipeValidation),deleteRecipe);

export default recipeRouter;