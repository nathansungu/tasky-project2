import { Router } from "express";
import createGroup from "../controllers/groups/creategroup.controller";
import getGroups from "../controllers/groups/getUserGroups.controller";
import groupTasks from "../controllers/groups/getTasks.controller";
import addMember from "../controllers/groups/addMember.controller";
import getGroup from "../controllers/groups/getGroup.controller";
import getMembers from "../controllers/groups/getGroupMembers.controller";
import removeUser from "../controllers/groups/removeUser.controller";
const group = Router();

group.post("/", createGroup);
group.get("/", getGroups);
group.get("/members/:id", getMembers);
group.get("/:id", getGroup);
group.get("/tasks/:groupId", groupTasks);
group.patch("/members", addMember);
group.patch("/member/:id", removeUser)

export default group;
