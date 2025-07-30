import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import asyncHandler from "../../../utilities/ayncHandler";
const client = new PrismaClient();
const getCompleteTasks = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.id;

  const tasks = await client.tasks.findMany({
    where: { userId: userId , isDeleted:false, groupId:null, iscompleted:true},
    include: {
      user: {
        select: {
          firstName: true,
          secondName: true,
        },
      },
    },
    });

  if (tasks.length == 0) {
    res
      .status(400)
      .json({ message: "No tasks yet: All task will appear here" });
    return;
  } else {
    res.status(200).json({ data: tasks });
  }

  if (!tasks) {
    res.status(400).json({ message: "Failed to fetch products" });

    return;
  }
});

export default getCompleteTasks;
