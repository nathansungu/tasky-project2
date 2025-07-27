import { PrismaClient } from "@prisma/client";
import asyncHandler from "../../../utilities/ayncHandler";
import { Request, Response } from "express";
const client = new PrismaClient();
type user = {
  firstName: string;
  secondName: string;
};
const users = asyncHandler(async (req: Request, res: Response) => {
  const userDetails = await client.user.findMany();
  if (userDetails.length == 0) {
    res.status(400).json({ message: "Create connections to see people" });
    return;
  }

  const updatedUser = [];

  for (const details of userDetails) {
    const { password, isDeleted, firstName, secondName, ...others } = details;
    const fl = updatedUser.push({ ...others, user: { firstName, secondName } });
  }
  return res.status(200).json({ data: updatedUser });
});

export default users;
