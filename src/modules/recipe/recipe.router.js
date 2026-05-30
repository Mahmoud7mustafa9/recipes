import express from "express";
import {addRecipe,getAllRecipes, getOneRecipe,updateRecipe,deleteRecipe} from "./recipecontroller.js";
import { uploadSingleFile } from "../../utils/upload.js";
import { validate } from "../../middlewares/validator.js";
import { addRecipeValidation , updateRecipeValidation , deleteRecipeValidation } from "./recipeValidation.js";
import { protectedRoutes,allowTo } from "../auth/authController.js";
const recipeRouter = express.Router();

recipeRouter.post("/",protectedRoutes,allowTo("admin"),uploadSingleFile("image"),validate(addRecipeValidation), addRecipe);
recipeRouter.get("/", getAllRecipes);
recipeRouter.get("/:id", getOneRecipe);
recipeRouter.put("/:id",protectedRoutes,allowTo("admin"),uploadSingleFile("image"),validate(updateRecipeValidation), updateRecipe);
recipeRouter.delete("/:id",protectedRoutes,allowTo("admin"), validate(deleteRecipeValidation),deleteRecipe);

export default recipeRouter;