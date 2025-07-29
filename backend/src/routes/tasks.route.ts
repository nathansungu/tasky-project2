import { Router } from "express";
import createTasks from "../controllers/tasks.controllers/createTask.controller";
import getTasks from "../controllers/tasks.controllers/getTasks.controller";
import getTask from "../controllers/tasks.controllers/getTask.controller";
import deleteTask from "../controllers/tasks.controllers/deleteTask.controller";
import updateTask from "../controllers/tasks.controllers/updateTask.controller";
import deletedTasks from "../controllers/tasks.controllers/deletedTasks.controller";
import restoreTask from "../controllers/tasks.controllers/restoreTask.controller";
import markComplete from "../controllers/tasks.controllers/completeTask.controller";
import markInComplete from "../controllers/tasks.controllers/incomplete.controller";
import getDescription from "../controllers/aicomponents/getDescription";
const tasks = Router();

tasks.post("/", createTasks);
tasks.get("/", getTasks);
tasks.get("/deleted", deletedTasks);
tasks.patch("/restore/:id",restoreTask)
tasks.patch("/complete/:id", markComplete)
tasks.patch("/inComplete/:id",markInComplete)
tasks.get("/:id", getTask);
tasks.delete("/:id", deleteTask);
tasks.patch("/:id", updateTask);
tasks.post("/ai/describe", getDescription)



export default tasks;
