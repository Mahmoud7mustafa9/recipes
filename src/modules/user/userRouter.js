import { Router } from "express";
import { addUser ,getAllUsers,getOneUser, updateUser , deleteUser } from "./UserController.js";

// getAllUsers,getOneUsers ,updateUser ,deleteUser 

import { checkEmail } from "../../middlewares/checkEmail.js";
const UseRouter = Router() ;


UseRouter.post("/", checkEmail, addUser)
UseRouter.get("/", getAllUsers)
UseRouter.get("/:id", getOneUser)
UseRouter.put("/:id", updateUser)
UseRouter.delete("/:id", deleteUser)

export { UseRouter }