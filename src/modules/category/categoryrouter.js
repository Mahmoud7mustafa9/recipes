import express from "express";
import {addCategory,getAllCategories,getOneCategory,updateCategory,deleteCategory} from "./categorycontroller.js";
import { addValidation  , updateValidation } from "./categoryValidation.js";
import { validate } from "../../middlewares/validator.js";
import { protectedRoutes , allowTo } from "../auth/authController.js";
const categoryRouter = express.Router();

categoryRouter.post("/", protectedRoutes,allowTo("admin"),validate(addValidation),addCategory);
categoryRouter.get("/", getAllCategories);
categoryRouter.get("/:id", getOneCategory);
categoryRouter.put("/:id",protectedRoutes,allowTo("admin"),validate(updateValidation), updateCategory);
categoryRouter.delete("/:id", protectedRoutes,allowTo("admin"),deleteCategory);

export default categoryRouter;