import express from "express";
import {addCategory,getAllCategories,getOneCategory,updateCategory,deleteCategory} from "./categorycontroller.js";
import { addValidation  , updateValidation } from "./categoryValidation.js";
import { validate } from "../../middlewares/validator.js";

const categoryRouter = express.Router();

categoryRouter.post("/", validate(addValidation),addCategory);
categoryRouter.get("/", getAllCategories);
categoryRouter.get("/:id", getOneCategory);
categoryRouter.put("/:id",validate(updateValidation), updateCategory);
categoryRouter.delete("/:id", deleteCategory);

export default categoryRouter;