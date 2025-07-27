import { PrismaClient } from "@prisma/client";
import asyncHandler from "../../../utilities/ayncHandler";
import { Request, Response } from "express";

const client = new PrismaClient();

const userProfile = asyncHandler(async (req: Request, res: Response) => {
  const {userId} = req.params;
  const user = await client.user.findUnique({
    where: { id: userId, isDeleted: false },
  });

  const { isDeleted, password, ...others } = user!;

  if (user) {
    res.status(200).json({ data: others });
    return;
  }
  return res.status(400).json({ message: "Invalid user" });
});

export default userProfile;