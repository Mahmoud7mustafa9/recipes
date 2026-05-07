import express from "express";
import {
  addFavorite,
  getUserFavorites,
  removeFavorite , getAllFavorites
} from "./favcontroller.js";

const favRouter = express.Router();

favRouter.post("/", addFavorite);
favRouter.get("/:id", getUserFavorites);
favRouter.get("/", getAllFavorites);
favRouter.delete("/:userId/:recipeId", removeFavorite);

export default favRouter;