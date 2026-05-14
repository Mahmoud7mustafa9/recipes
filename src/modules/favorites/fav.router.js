import express from "express";
import {
  addFavorite,
  getUserFavorites,
  removeFavorite , getAllFavorites
} from "./favcontroller.js";
import { validator } from "../../middlewares/validator.js";
import { addFavValidation } from "./favorites.validation.js";



const favRouter = express.Router();

favRouter.post("/", validator(addFavValidation),addFavorite);
favRouter.get("/:id", getUserFavorites);
favRouter.get("/", getAllFavorites);
favRouter.delete("/:userId/:recipeId", removeFavorite);

export default favRouter;