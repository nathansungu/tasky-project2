import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import asyncHandler from "../../../utilities/ayncHandler";
import de from "zod/v4/locales/de.cjs";
const client = new PrismaClient();

const getTask = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const specificTask = await client.tasks.findFirst({
    where: { id: id, isDeleted:false },
    include: {
      user: {
        select: {
          firstName: true,
          secondName: true,
        },
      },
    },
  });

  if (specificTask) {
    res.status(200).json({ data: specificTask });
  }
  return res.status(400).json({message: "Product not found"})
});

export default getTask
