import { Router } from "express";
import updateProfile from "../controllers/user.controllers/updateProfille.controller";
import changePassword from "../controllers/user.controllers/changePassword.controller";
import logedinUser from "../controllers/authentication/logedInuser.controller";
import users from "../controllers/user.controllers/getAllUsersDetails.controller";
import userProfile from "../controllers/user.controllers/getUserProfile.controller";
const user = Router();

user.patch("/", updateProfile);
user.patch("/password", changePassword);
user.get("/",users)
user.get("/:id",userProfile)
user.post("/me",logedinUser)

export default user;
