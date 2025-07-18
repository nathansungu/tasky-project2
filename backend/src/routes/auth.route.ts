import { Router } from "express";
import register from "../controllers/authentication/register.controller";
import login from "../controllers/authentication/login.controller";
import logout from "../controllers/authentication/logout.controller";

const auth = Router();

auth.post("/register", register);
auth.post("/login", login);
auth.post("/logout",logout)

export default auth;
