import { model, Schema } from "mongoose";

const categorySchema = new Schema (
    {
      name : {
        type: String,
        require:true
      },
    }
)

export const Category = model("category", categorySchema);