import { PrismaClient } from "@prisma/client";
import asyncHandler from "../../../utilities/ayncHandler";
import { Request, Response } from "express";
import { addGroupMemberSchema } from "../../../zodSchemasValidation/group.schema";

const client = new PrismaClient();

const addMember = asyncHandler(async (req: Request, res: Response) => {
  const users = await addGroupMemberSchema.parseAsync(req.body);
  await client.groupMembers.createMany({
    data: users,
  });

  return res.status(201).json({ message: "user-s added successfully" });
});

export default addMember;
