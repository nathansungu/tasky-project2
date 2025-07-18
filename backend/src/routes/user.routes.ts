import { Router } from "express";
import updateProfile from "../controllers/user.controllers/updateProfille.controller";
import changePassword from "../controllers/user.controllers/changePassword.controller";
const user = Router();

user.patch("/", updateProfile);
user.patch("/password", changePassword);

export default user;
