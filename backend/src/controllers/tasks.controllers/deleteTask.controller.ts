import { PrismaClient } from "@prisma/client";
import asyncHandler from "../../../utilities/ayncHandler";
import { Request, Response } from "express";

const client = new PrismaClient();

const deleteTask = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const taskDelete = await client.tasks.update({
    where: { id: id },
    data: { isDeleted: true },
  });

  if (taskDelete) {
    res.status(200).json({
      message: "Task deleted successfully",
    });
    return;
  }

  return res.status(400).json({ message: "Failed to delete task" });
});

export default deleteTask;