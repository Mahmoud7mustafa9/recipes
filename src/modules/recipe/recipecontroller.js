import { Recipe } from "../../../database/models/recipeSchema.js";


// 5. updateRecipe Does Not Handle Image Replacement (recipe.controller.js)

  //  If a new file is uploaded during an update, req.file is never read and the image field in the database
  //  is never updated. Additionally, the old image file on disk is never deleted,
  //  leaving orphaned files in uploads/recipes/.

  //  Before saving the update, check for req.file, delete the old image from disk if it exists,
  //  and set the new filename in the update payload.


// 7. deleteRecipe Does Not Delete the Image File from Disk (recipe.controller.js)

  //  When a recipe is deleted, the associated image stored in uploads/recipes/ is never removed.
    // Over time this causes orphaned files to accumulate. After confirming the document was found,
    //  extract the filename from the stored path and unlink it from disk.

// 8. post("init") Hook Uses a Hardcoded localhost URL (recipeSchema.js)

  //  The hook builds the image URL as:
  //  doc.image = `http://localhost:3000/` + doc.image

  //  This will produce broken URLs in any environment other than local development (staging, production, etc.).
    // Use an environment variable instead:
  //  doc.image = `${process.env.APP_URL || 'http://localhost:3000'}/` + doc.image
// 
// 9. getAllRecipes Does Not Populate Relational Fields (recipe.controller.js)
// 
    // getOneRecipe correctly populates user and category, but getAllRecipes returns raw 
    // ObjectIds with no population.
    //  This gives clients inconsistent data shapes depending on which endpoint they call.
      // Add the same populate calls to getAllRecipes.







export const addRecipe = async (req, res) => {
 try {
    console.log("FILE:", req.file);

     if (!req.file) {
     return res.status(400).json({ message: 'Image is required' });
   }
  //  req.body.image = req.file.filename;

    const { title, description, ingredients, category, price } = req.body;
   const createdBy = req.user._id; // from auth middleware
 
   const data = new Recipe({ title, description, ingredients, category, price, createdBy, image: req.file.filename })

    // let data = new Recipe(req.body);

    await data.save()

    res.status(201).json({ message: "Recipe created", data });
  }
catch (err){
  res.status(400).json({ message: err.message });
  }
  }


  // try{
//  console.log (req.file.filename);
    
// 





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
      const data = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
   if (!data) {
     return res.status(404).json({ message: 'Recipe not found' });
   }
   res.status(200).json({ message: 'Updated', data });
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
   res.status(200).json({ message: 'Recipe deleted' });
  
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};