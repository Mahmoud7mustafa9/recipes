import { Category } from "../../../database/models/categorySchema.js";
import { catchError } from "../../middlewares/catchError.js";
import { AppError } from "../../utils/AppError.js";



export const addCategory = catchError(
  async (req, res,next ) => {
  
    const data = await Category.create(req.body);
if(data){
    res.status(201).json({
      message: "Category created",
      data
    });}
     else {
      next(new AppError("error in adding category", 404))}
  }
)

export const getAllCategories = catchError(
  async (req, res,next) => {
const data = await Category.find();

   if(data) return res.status(200).json(data);

   return next(new AppError("no categories found", 404))
})


export const getOneCategory = catchError(async (req, res,next) => {

    const data = await Category.findById(req.params.id);

    if (data) {
      return res.status(200).json(data);
    }
else { return next(new AppError("Category not found", 404))}
  
})


export const updateCategory = catchError( async (req, res,next) => {
  
    const data = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (data) return res.status(200).json({message: "Updated successfully", data });
    return next(new AppError("the category is not found", 404))
    })


export const deleteCategory = catchError(async (req, res,next) => {
  
    const data = await Category.findByIdAndDelete(req.params.id);

    if (!data) {
       return next(new AppError("category is not found ", 404))
    }

    return res.status(200).json({ message: "Category deleted" });

})