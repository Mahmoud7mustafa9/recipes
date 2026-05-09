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

       category : {
         type : mongoose.Types.ObjectId,
         ref: "Category" ,
        // required: true

},
createdBy: {
    type:Schema.Types.ObjectId,
    ref :"user",
    required: true, 
},
image : String ,
price : {
    type : Number,
    required : true ,
}
    }

)

recipeSchema.post("init", (doc)=>{
    doc.image = `http://localhost:3000/`+ doc.image
})

export const Recipe = model("recipe", recipeSchema);