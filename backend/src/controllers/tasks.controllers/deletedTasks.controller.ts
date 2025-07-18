import { PrismaClient } from "@prisma/client";
import asyncHandler from "../../../utilities/ayncHandler";
import { Request, Response } from "express";
const client = new PrismaClient();

const deletedTasks = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const taskDeleted = await client.tasks.findMany({
    where: {
      userId: userId,
      isDeleted: true,
    },
  });
  console.log(taskDeleted);
  if (taskDeleted.length == 0) {
    res.status(400).json({ message: "Deleted  tasks will display here." });
    return;
  }

  return res.status(200).json({ data: taskDeleted });
});

export default deletedTasks;
