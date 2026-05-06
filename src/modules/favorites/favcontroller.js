import { Favorites } from "../../../database/models/favoriteSchema.js";
import { Recipe } from "../../../database/models/recipeSchema.js";



export const addFavorite = async (req, res) => {
  try {
    const { user, recipe } = req.body;

  
    const recipeExists = await Recipe.findById(recipe);

    if (!recipeExists) {
      return res.status(400).json({ message: "Invalid recipe" });
    }

    const data = await Favorites.create({ user, recipe });

    res.status(201).json({
      message: "Added to favorites",
      data
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};



export const getUserFavorites = async (req, res) => {
  try {
    const data = await Favorites.find({ user: req.params.userId })
      .populate("recipe")
      .populate("user");

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const removeFavorite = async (req, res) => {
  try {
    const data = await Favorites.findOneAndDelete({
      user: req.params.userId,
      recipe: req.params.recipeId
    });

    if (!data) {
      return res.status(404).json({ message: "Favorite not found" });
    }

    res.status(200).json({ message: "Removed from favorites" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};