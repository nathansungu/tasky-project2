import { PrismaClient } from "@prisma/client";
import asyncHandler from "../../../utilities/ayncHandler";
import { Request, Response } from "express";
import undoneTasks from "../../services/groups";
import group from "../../routes/groups.route";
const client = new PrismaClient();

type group ={
  id: string;
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    isDeleted: boolean;
}

interface upDatedGroup extends group {
  undoneTasks:number
}

const getGroups = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const groups = await client.group.findMany({
    where: {
      groupMembers: {
        some: { userId: userId },
      },
    },
  });
  //set up empty array and push new values in.
  const updatedTasks:upDatedGroup[]=[];

  for (const group of groups) {
    const undone = await undoneTasks(group.id);
    updatedTasks.push({
      ...group,
      undoneTasks: undone,
    });
  }

  return res.status(200).json({ data: updatedTasks });
});

export default getGroups;
