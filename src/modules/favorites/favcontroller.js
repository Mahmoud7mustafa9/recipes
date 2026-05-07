import { Favorites } from "../../../database/models/favoriteSchema.js";
import { Recipe } from "../../../database/models/recipeSchema.js";



export const addFavorite = async (req, res) => {
  try {

     const data = new Favorites(req.body);

     await data.save()
   
    res.status(201).json({ message: "Added to favorites", data});

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getAllFavorites = async (req, res) => {
  try {

    const data = await Favorites.find().populate("user","name -_id").populate("recipe","title -_id");

      
    res.status(200).json({ message: "success" , data});

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const getUserFavorites = async (req, res) => {
  try {
    const data = await Favorites.find({ user: req.params.id }).populate("user","name - _id").populate("recipe","title - _id");
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


