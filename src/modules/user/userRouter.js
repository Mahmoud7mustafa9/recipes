import { Router } from "express";
import { addUser ,getAllUsers,getOneUser, updateUser , deleteUser } from "./UserController.js";
import { validator } from "../../middlewares/validator.js";
// getAllUsers,getOneUsers ,updateUser ,deleteUser 
import { addUserValidation, updateUserValidation } from "./userValidation.js";
import { checkEmail } from "../../middlewares/checkEmail.js";
const UseRouter = Router() ;


UseRouter.post("/", validator(addUserValidation),checkEmail, addUser)
UseRouter.get("/", getAllUsers)
UseRouter.get("/:id", getOneUser)
UseRouter.put("/:id", validator(updateUserValidation),updateUser)
UseRouter.delete("/:id", deleteUser)

export { UseRouter }