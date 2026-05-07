import mongoose, { model, Schema } from "mongoose";

const favoriteSchema = new Schema (
    {
      user : {
        type: mongoose.SchemaTypes.ObjectId,
        ref:"user",
        required:true,
      },

      recipe : {
        type: mongoose.SchemaTypes.ObjectId,
        ref:"recipe",
        required:true,
      },
    
    
    },)


    favoriteSchema.set("toJSON",{
      transform: (doc , ret)=>{
          delete ret.__v ;
      }}
    )

export const Favorites = model("favorite", favoriteSchema);