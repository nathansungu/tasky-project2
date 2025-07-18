import { Router } from "express";
import createGroup from "../controllers/groups/creategroup.controller";
import getGroups from "../controllers/groups/getUserGroups.controller";
const group = Router()

group.post("/",createGroup)
group.get("/", getGroups)

export default group;