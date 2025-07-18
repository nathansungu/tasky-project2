import { PrismaClient } from "@prisma/client";
import asyncHandler from "../../../utilities/ayncHandler";
import { Request, Response } from "express";
import { changePasssword } from "../../../zodSchemasValidation/userSchema";
import bcrypt from "bcrypt";

const client = new PrismaClient();

const changePassword = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const newPAssword = await changePasssword.parseAsync(req.body);
  const user = await client.user.findUnique({
    where: { id: userId },
  });
  //is valid 
  const validUser = await bcrypt.compare(newPAssword.currentPassword, user!.password);
  if (!validUser) {
    res.status(400).json({message:"Wrong current password!"})
  }
  const passwordCompare = await bcrypt.compare(
    newPAssword.newPassword,
        user!.password
  );

  if (passwordCompare) {
    res.status(400).json({message:"Use a diffrent password from the current!"});
    return;
  }
  const changedPassword = await client.user.update({
    where: { id: userId },
    data: { password: await bcrypt.hash(newPAssword.newPassword, 10) },
  });

  return res.status(200).json({ message: "Password changed succesfuly" });
});

export default changePassword;
