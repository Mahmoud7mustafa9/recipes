import { Recipe } from "../../../database/models/recipeSchema.js";


export const addRecipe = async (req, res) => {
 try {

    console.log("FILE:", req.file);

     if (!req.file) {
     return res.status(400).json({ message: 'Image is required' });
   }
  //  req.body.image = req.file.filename;

    const { title, description, ingredients, category, price } = req.body;
   const createdBy = req.user._id; 
 
   const data = new Recipe({ title, description, ingredients, category, price, createdBy, image: req.file.filename })

    // let data = new Recipe(req.body);

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
      .populate("user")
      .populate("category");

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
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    // Handle image replacement
    if (req.file) {
      // Delete old image if exists
      if (recipe.image) {
        const oldImagePath = path.join(
          "uploads/recipes",
          path.basename(recipe.image)
        );

        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }

      // Save new image filename
      req.body.image = req.file.filename;
    }

    const updated = await Recipe.findByIdAndUpdate(req.params.id,req.body,{ new: true });

    res.status(200).json({message: "Updated",data: updated,});
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


export const deleteRecipe = async (req, res) => {
  try {
  
    // await Recipe.findByIdAndDelete(req.params.id); 
    
   const deleted = await Recipe.findByIdAndDelete(req.params.id);

   if (!deleted) {
     return res.status(404).json({ message: 'Recipe not found' });
   }


    // Delete image from disk
    if (deleted.image) {
      const imagePath = path.join(
        "uploads/recipes",
        path.basename(deleted.image)
      );

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

   res.status(200).json({ message: 'Recipe deleted' });
  
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};