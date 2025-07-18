import { Request, Response } from "express";
import asyncHandler from "../../../utilities/ayncHandler";
import { createTaskSchema } from "../../../zodSchemasValidation/tasks.schem";
import { PrismaClient } from "@prisma/client";

const createTasks = asyncHandler(async (req: Request, res: Response) => {
  const client = new PrismaClient();
  const userId = req.user!.id;
  const userData = await createTaskSchema.parseAsync(req.body);
  const task = { ...userData, userId };

  const newBlog = await client.tasks.create({
    data: task,
  });

  if (newBlog) {
    res.status(201).json({ message: "Task added successfully" });
    return;
  }
});

export default createTasks;
