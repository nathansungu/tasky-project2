import { PrismaClient } from "@prisma/client";
import asyncHandler from "../../../utilities/ayncHandler";
import { Request, Response } from "express";
import getUndoneTasks from "../../services/groups"; // renamed for clarity

const client = new PrismaClient();

const getGroup = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const group = await client.group.findUnique({
    where: { id , isDeleted:false},
  });

  if (!group ) {
    return res.status(404).json({ message: "Group not found" });
  }

  const undone = await getUndoneTasks(group.id); 

  const updatedGroup = {
    ...group,
    undoneTasks: undone,
  };

  return res.status(200).json({ data: updatedGroup });
});

export default getGroup;
