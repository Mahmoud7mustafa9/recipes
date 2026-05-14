import express from "express";
import {addRecipe,getAllRecipes, getOneRecipe,updateRecipe,deleteRecipe} from "./recipecontroller.js";
import { uploadSingleFile } from "../../utils/upload.js";
import { validator } from "../../middlewares/validator.js";
import { addReceipeValidation , updateReceipeValidation } from "./recipeValidation.js";


const recipeRouter = express.Router();

recipeRouter.post("/",uploadSingleFile("image"),validator(addReceipeValidation), addRecipe);
recipeRouter.get("/", getAllRecipes);
recipeRouter.get("/:id", getOneRecipe);
recipeRouter.put("/:id",validator(updateReceipeValidation), updateRecipe);
recipeRouter.delete("/:id", deleteRecipe);

export default recipeRouter;