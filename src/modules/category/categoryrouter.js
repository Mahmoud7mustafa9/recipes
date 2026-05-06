import express from "express";
import {
  addCategory,
  getAllCategories,
  getOneCategory,
  updateCategory,
  deleteCategory
} from "./categorycontroller.js";

const categoryRouter = express.Router();

categoryRouter.post("/", addCategory);
categoryRouter.get("/", getAllCategories);
categoryRouter.get("/:id", getOneCategory);
categoryRouter.put("/:id", updateCategory);
categoryRouter.delete("/:id", deleteCategory);

export default categoryRouter;