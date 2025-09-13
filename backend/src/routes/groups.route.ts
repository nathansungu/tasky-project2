import { Router } from "express";
import createGroup from "../controllers/groups/creategroup.controller";
import getGroups from "../controllers/groups/getUserGroups.controller";
import groupTasks from "../controllers/groups/getTasks.controller";
import addMember from "../controllers/groups/addMember.controller";
import getGroup from "../controllers/groups/getGroup.controller";
import getMembers from "../controllers/groups/getGroupMembers.controller";
import removeUser from "../controllers/groups/removeUser.controller";

const group = Router();

/**
 * @openapi
 * /api/group:
 *   post:
 *     summary: Create a new group
 *     tags: [Groups]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: Study Group
 *               description:
 *                 type: string
 *                 example: A group for AI class tasks
 *     responses:
 *       201:
 *         description: Group created successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal server error
 */
group.post("/", createGroup);

/**
 * @openapi
 * /api/group:
 *   get:
 *     summary: Get all groups for the authenticated user
 *     tags: [Groups]
 *     responses:
 *       200:
 *         description: A list of groups
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Group'
 */
group.get("/", getGroups);

/**
 * @openapi
 * /api/group/members/{id}:
 *   get:
 *     summary: Get members of a group
 *     tags: [Groups]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Group ID
 *     responses:
 *       200:
 *         description: A list of members
 */
group.get("/members/:id", getMembers);

/**
 * @openapi
 * /api/group/{id}:
 *   get:
 *     summary: Get a group by ID
 *     tags: [Groups]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Group ID
 *     responses:
 *       200:
 *         description: Group details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Group'
 *       404:
 *         description: Group not found
 */
group.get("/:id", getGroup);

/**
 * @openapi
 * /api/group/tasks/{groupId}:
 *   get:
 *     summary: Get tasks in a group
 *     tags: [Groups]
 *     parameters:
 *       - in: path
 *         name: groupId
 *         schema:
 *           type: string
 *         required: true
 *         description: Group ID
 *     responses:
 *       200:
 *         description: A list of tasks
 */
group.get("/tasks/:groupId", groupTasks);

/**
 * @openapi
 * /api/group/members:
 *   patch:
 *     summary: Add a member to a group
 *     tags: [Groups]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               groupId:
 *                 type: string
 *               userId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Member added successfully
 */
group.patch("/members", addMember);

/**
 * @openapi
 * /api/group/member:
 *   patch:
 *     summary: Remove a member from a group
 *     tags: [Groups]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               groupId:
 *                 type: string
 *               userId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Member removed successfully
 */
group.patch("/member", removeUser);

export default group;
