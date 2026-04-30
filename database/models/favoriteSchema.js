import mongoose, { model, Schema } from "mongoose";

const favoriteSchema = new Schema (
    {
      user : {
        type: mongoose.Types.ObjectId,
        ref:"User",
        require:true,
      },

      recipe : {
        type: mongoose.Types.ObjectId,
        ref:"Recipe",
        require:true,
      },
    
    
    }
)

export const Favorites = model("favorite", favoriteSchema);