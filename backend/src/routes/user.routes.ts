import { Router } from "express";
import updateProfile from "../controllers/user.controllers/updateProfille.controller";
import changePassword from "../controllers/user.controllers/changePassword.controller";
import logedinUser from "../controllers/authentication/logedInuser.controller";
import users from "../controllers/user.controllers/getAllUsersDetails.controller";
import userProfile from "../controllers/user.controllers/getUserProfile.controller";

const user = Router();

/**
 * @openapi
 * tags:
 *   - name: Users
 *     description: User profile and account management
 *
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         username:
 *           type: string
 *         email:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *     UpdateProfileInput:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *         email:
 *           type: string
 *     ChangePasswordInput:
 *       type: object
 *       properties:
 *         oldPassword:
 *           type: string
 *         newPassword:
 *           type: string
 *       required:
 *         - oldPassword
 *         - newPassword
 */

/**
 * @openapi
 * /api/user:
 *   patch:
 *     tags: [Users]
 *     summary: Update user profile
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateProfileInput'
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       400:
 *         description: Invalid input
 */
user.patch("/", updateProfile);

/**
 * @openapi
 * /api/user/password:
 *   patch:
 *     tags: [Users]
 *     summary: Change user password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ChangePasswordInput'
 *     responses:
 *       200:
 *         description: Password changed successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 */
user.patch("/password", changePassword);

/**
 * @openapi
 * /api/user:
 *   get:
 *     tags: [Users]
 *     summary: Get all users
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
user.get("/", users);

/**
 * @openapi
 * /api/user/{id}:
 *   get:
 *     tags: [Users]
 *     summary: Get user profile by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 */
user.get("/:id", userProfile);

/**
 * @openapi
 * /api/user/me:
 *   post:
 *     tags: [Users]
 *     summary: Get currently logged-in user
 *     responses:
 *       200:
 *         description: Current user details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 */
user.post("/me", logedinUser);

export default user;
