import express from "express";
import {
  addFavorite,
  getUserFavorites,
  removeFavorite , getAllFavorites
} from "./favcontroller.js";
import { validate } from "../../middlewares/validator.js";
import { addFavValidation, deleteFavValidation } from "./favorites.validation.js";
import { verifyToken } from "../../middlewares/verifyToken.js";
import { protectedRoutes, allowTo } from "../auth/authController.js";

const favRouter = express.Router();
favRouter.use(protectedRoutes)
favRouter.use(allowTo("admin","user"))

favRouter.post("/", validate(addFavValidation),verifyToken,addFavorite);
favRouter.get("/", verifyToken,getAllFavorites);
favRouter.get("/:id", getUserFavorites);
favRouter.delete("/:userId/:recipeId",validate(deleteFavValidation), removeFavorite);

export default favRouter;