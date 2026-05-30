import { Favorites } from "../../../database/models/favoriteSchema.js";
import { catchError } from "../../middlewares/catchError.js";
import { AppError } from "../../utils/AppError.js";


export const addFavorite = catchError(async (req, res,next) => {

const recipe = req.body

const isExist = await Favorites.findOne({recipe, user:req.user.id});

if(isExist) return next(new AppError("you already added this recipe before ", 400))


req.body.user = req.user.id;

const data = new Favorites(req.body);

await data.save()
   
res.status(201).json({ message: "Added to favorites successfully", data});


  })
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


export const removeFavorite =
catchError( async (req, res,next) => {
let {id} = req.params
    const data = await Favorites.findOneAndDelete({
      user: id ,
      recipe: req.user.id
    });

    if (!data) {
      return next(new AppError( "Favorite not found",404));
    }
else{
    res.status(200).json({ message: "Removed from favorites" });
  } 
}
)

