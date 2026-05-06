import { Category } from "../../../database/models/categorySchema.js";



export const addCategory = async (req, res) => {
  try {
    const data = await Category.create(req.body);

    res.status(201).json({
      message: "Category created",
      data
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


export const getAllCategories = async (req, res) => {
  try {
    const data = await Category.find();

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



export const getOneCategory = async (req, res) => {
  try {
    const data = await Category.findById(req.params.id);

    if (!data) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const updateCategory = async (req, res) => {
  try {
    const data = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!data) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({
      message: "Updated successfully",
      data
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};



export const deleteCategory = async (req, res) => {
  try {
    const data = await Category.findByIdAndDelete(req.params.id);

    if (!data) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({ message: "Category deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};