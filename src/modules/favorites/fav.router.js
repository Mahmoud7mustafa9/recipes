import express from "express";
import {
  addFavorite,
  getUserFavorites,
  removeFavorite , getAllFavorites
} from "./favcontroller.js";
import { validate } from "../../middlewares/validator.js";
import { addFavValidation, deleteFavValidation } from "./favorites.validation.js";
import { verifyToken } from "../../middlewares/verifyToken.js";


const favRouter = express.Router();

favRouter.post("/", validate(addFavValidation),verifyToken,addFavorite);
favRouter.get("/:id", getUserFavorites);
favRouter.get("/", verifyToken,getAllFavorites);
favRouter.delete("/:userId/:recipeId",validate(deleteFavValidation), removeFavorite);

export default favRouter;