import { Recipe } from "../../../database/models/recipeSchema.js";



export const addRecipe = async (req, res) => {
try{
 
    
req.body.image = req.file.filename ; 

   let data = new Recipe(req.body);

await data.save()
    res.status(201).json({ message: "Recipe created", data });
  }
catch (err){
  res.status(400).json({ message: err.message });
  }
  }




export const getAllRecipes = async (req, res) => {

  try {

    const data = await Recipe.find()
   
    res.status(200).json(data);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



export const getOneRecipe = async (req, res) => {
  try {
    let {id}= req.params
    const data = await Recipe.findById(id)
      .populate("user")
      .populate("category");

    if (!data) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const updateRecipe = async (req, res) => {
  try {
    const data = await Recipe.findByIdAndUpdate(req.params.id,req.body,{ new: true }
    );

    res.status(200).json({ message: "Updated", data });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteRecipe = async (req, res) => {
  try {
  
    await Recipe.findByIdAndDelete(req.params.id);
  
    res.status(200).json({ message: "recipe Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};