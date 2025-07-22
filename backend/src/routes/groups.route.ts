import { Router } from "express";
import createGroup from "../controllers/groups/creategroup.controller";
import getGroups from "../controllers/groups/getUserGroups.controller";
import groupTasks from "../controllers/groups/getTasks.controller";
import addMember from "../controllers/groups/addMember.controller";
const group = Router()

group.post("/",createGroup)
group.get("/", getGroups)
group.get("/tasks/:groupId",groupTasks)
group.post("/members",addMember)

export default group;