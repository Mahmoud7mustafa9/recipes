import mongoose, { model, Schema } from "mongoose";


const recipeSchema = new Schema (
    {
       title :{
            type : String,
            required : true,
        },
        description : {
            type : String,
            required: true,
        },
        ingredients : [{
            type : String,
            required: true,
        },] ,
       user : {
            type : mongoose.Types.ObjectId,
            ref: "User",
            required: true

},
       category : {
         type : mongoose.Types.ObjectId,
         ref: "Category" ,
        required: true

},
createdBy: {
    type:Schema.Types.ObjectId,
    ref :"User",
    required: true, 
},
image : String ,
price : {
    type : String,
    required : true ,
}
    }
)

export const Recipe = model("recipe", recipeSchema);