import mongoose, { model, Schema } from "mongoose";

const favoriteSchema = new Schema (
    {
      user : {
        type: mongoose.Types.ObjectId,
        ref:"User",
        required:true,
      },

      recipe : {
        type: mongoose.Types.ObjectId,
        ref:"Recipe",
        required:true,
      },
    
    
    }
)

export const Favorites = model("favorite", favoriteSchema);