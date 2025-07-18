import bcrypt  from 'bcrypt';
import { PrismaClient } from "@prisma/client";
import { registerSchema } from "../../../zodSchemasValidation/userSchema";
import { Request, Response } from "express";
import asyncHandler from "../../../utilities/ayncHandler";
const client = new PrismaClient();
const register = asyncHandler(async (req: Request, res: Response) => {
  const userData = await registerSchema.parseAsync(req.body);

  //password bcryp
  const bcryptPassword =await bcrypt.hash(userData.password, 10)
  const {password, ...otherDetails} = userData
  const safeDetails = {...otherDetails, password:bcryptPassword}

  const newUser = await client.user.create({
    data: safeDetails,
  });

  if (newUser) {
    res.status(201).json({message:"Account created successfully"})
    return
  }
});

export default register;
