import express from "express";
import {addCategory,getAllCategories,getOneCategory,updateCategory,deleteCategory} from "./categorycontroller.js";
import { addValidation  , updateValidation } from "./categoryValidation.js";
import { validator } from "../../middlewares/validator.js";

const categoryRouter = express.Router();

categoryRouter.post("/", validator(addValidation),addCategory);
categoryRouter.get("/", getAllCategories);
categoryRouter.get("/:id", getOneCategory);
categoryRouter.put("/:id",validator(updateValidation), updateCategory);
categoryRouter.delete("/:id", deleteCategory);

export default categoryRouter;