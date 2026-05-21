import { Router } from "express";
import { addUser ,getAllUsers,getOneUser, updateUser , deleteUser } from "./UserController.js";
import { validate } from "../../middlewares/validator.js";
// getAllUsers,getOneUsers ,updateUser ,deleteUser 
import { addUserValidation, updateUserValidation } from "./userValidation.js";
import { checkEmail } from "../../middlewares/checkEmail.js";
import { protectedRoutes, allowTo } from "../auth/authController.js";
const UseRouter = Router() ;

UseRouter.use(protectedRoutes)


UseRouter.post("/", allowTo("admin"),validate(addUserValidation),checkEmail, addUser)
UseRouter.get("/", getAllUsers)
UseRouter.get("/:id", getOneUser)
UseRouter.put("/:id", allowTo("admin","user"),validate(updateUserValidation),updateUser)
UseRouter.delete("/:id",allowTo("admin"), deleteUser)

export { UseRouter }