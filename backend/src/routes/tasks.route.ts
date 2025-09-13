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
import getCompleteTasks from "../controllers/tasks.controllers/getCompleteTasks.controller";

const tasks = Router();

/**
 * @openapi
 * tags:
 *   - name: Tasks
 *     description: Task management endpoints
 *
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         deadLine:
 *           type: string
 *           format: date-time
 *         urgency:
 *           type: integer
 *         groupId:
 *           type: string
 *         completed:
 *           type: boolean
 *     CreateTaskInput:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           example: "Finish report"
 *         description:
 *           type: string
 *           example: "Write and submit final project report"
 *         deadLine:
 *           type: string
 *           example: "2025-09-30"
 *         urgency:
 *           type: integer
 *           example: 2
 *         groupId:
 *           type: string
 *           example: "group123"
 *       required:
 *         - title
 *         - description
 *     UpdateTaskInput:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         deadLine:
 *           type: string
 *         urgency:
 *           type: integer
 */

/**
 * @openapi
 * /api/tasks:
 *   post:
 *     tags: [Tasks]
 *     summary: Create a new task
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateTaskInput'
 *     responses:
 *       201:
 *         description: Task created successfully
 *       400:
 *         description: Invalid request
 */
tasks.post("/", createTasks);

/**
 * @openapi
 * /api/tasks:
 *   get:
 *     tags: [Tasks]
 *     summary: Get all tasks
 *     responses:
 *       200:
 *         description: List of tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 */
tasks.get("/", getTasks);

/**
 * @openapi
 * /api/tasks/deleted:
 *   get:
 *     tags: [Tasks]
 *     summary: Get deleted tasks
 *     responses:
 *       200:
 *         description: List of deleted tasks
 */
tasks.get("/deleted", deletedTasks);

/**
 * @openapi
 * /api/tasks/complete:
 *   get:
 *     tags: [Tasks]
 *     summary: Get completed tasks
 *     responses:
 *       200:
 *         description: List of completed tasks
 */
tasks.get("/complete", getCompleteTasks);

/**
 * @openapi
 * /api/tasks/restore/{id}:
 *   patch:
 *     tags: [Tasks]
 *     summary: Restore a deleted task
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task restored successfully
 */
tasks.patch("/restore/:id", restoreTask);

/**
 * @openapi
 * /api/tasks/complete/{id}:
 *   patch:
 *     tags: [Tasks]
 *     summary: Mark a task as complete
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task marked as complete
 */
tasks.patch("/complete/:id", markComplete);

/**
 * @openapi
 * /api/tasks/inComplete/{id}:
 *   patch:
 *     tags: [Tasks]
 *     summary: Mark a task as incomplete
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task marked as incomplete
 */
tasks.patch("/inComplete/:id", markInComplete);

/**
 * @openapi
 * /api/tasks/{id}:
 *   get:
 *     tags: [Tasks]
 *     summary: Get task by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 */
tasks.get("/:id", getTask);

/**
 * @openapi
 * /api/tasks/{id}:
 *   delete:
 *     tags: [Tasks]
 *     summary: Delete task by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task deleted successfully
 */
tasks.delete("/:id", deleteTask);

/**
 * @openapi
 * /api/tasks/{id}:
 *   patch:
 *     tags: [Tasks]
 *     summary: Update a task
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateTaskInput'
 *     responses:
 *       200:
 *         description: Task updated successfully
 */
tasks.patch("/:id", updateTask);

/**
 * @openapi
 * /api/tasks/ai/describe:
 *   post:
 *     tags: [Tasks]
 *     summary: Get AI-generated task description
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Research project"
 *     responses:
 *       200:
 *         description: Generated description
 */
tasks.post("/ai/describe", getDescription);

export default tasks;
