import { PrismaClient } from "@prisma/client";
import asyncHandler from "../../../utilities/ayncHandler";
import { Request, Response } from "express";

const client = new PrismaClient();

const getGroups = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const groups = await client.group.findMany({
    where: {
      groupMembers: {
        some: { userId: userId },
      },
    },
  });

  if (groups.length == 0) {
    res.status(400).json({ message: "Groups you belong to will appear here" });
    return;
  }

  return res.status(200).json({ data: groups });
});

export default getGroups;
