import express from "express";
import {
  addFavorite,
  getUserFavorites,
  removeFavorite
} from "./favcontroller.js";

const favRouter = express.Router();

favRouter.post("/", addFavorite);
favRouter.get("/:userId", getUserFavorites);
favRouter.delete("/:userId/:recipeId", removeFavorite);

export default favRouter;