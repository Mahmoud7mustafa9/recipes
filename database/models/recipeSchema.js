import mongoose, { model, Schema } from "mongoose";
import { Category } from "./categoryShema";

const recipeSchema = new Schema (
    {
       title :{
            type : String,
            require : true,
        },
        description : {
            type : string,
            require: true,
        },
        ingredients : [{
            type : string,
            require: true,
        },] ,
       user : {
            type : mongoose.Types.ObjectId,
            ref: "User",
            require: true

},
       category : {
         type : mongoose.Types.ObjectId,
         ref: "Category" ,
        required: true

}

    }
)

export const Recipe = model("recipe", recipeSchema);