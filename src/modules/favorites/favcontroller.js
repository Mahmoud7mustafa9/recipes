import { Favorites } from "../../../database/models/favoriteSchema.js";
import { Recipe } from "../../../database/models/recipeSchema.js";
import { catchError } from "../../middlewares/catchError.js";
import { AppError } from "../../utils/AppError.js";
import jwt from"jsonwebtoken";

export const addFavorite = async (req, res) => {
  try {

   req.body.user = req.user.id;

     const data = new Favorites(req.body);

     await data.save()
   
    res.status(201).json({ message: "Added to favorites", data});

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
export const getAllFavorites = catchError(async (req, res, next) => {


  const data = await Favorites.find({user:req.user.id})
    .populate("user", "name -_id")
    .populate("recipe", "title -_id");

  if (!data.length) {
    return next(new AppError("No favorites found", 404));
  }

  res.status(200).json({
    message: "Success",
    data
  });
});

export const getUserFavorites = catchError(async (req, res, next) => {
  const data = await Favorites.find({ user: req.params.id })
    .populate("user", "name -_id")
    .populate("recipe", "title -_id");

  if (!data.length) {
    return next(new AppError("No favorites found for this user", 404));
  }

  res.status(200).json({
    message: "Success",
    data
  });
});


export const removeFavorite =catchError( async (req, res) => {

    const data = await Favorites.findOneAndDelete({
      user: req.params.userId,
      recipe: req.params.recipeId
    });

    if (!data) {
      return next(new AppError( "Favorite not found",404));
    }
else{
    res.status(200).json({ message: "Removed from favorites" });
  } 
}
)

