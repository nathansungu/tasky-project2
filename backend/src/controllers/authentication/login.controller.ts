import { PrismaClient } from "@prisma/client";
import asyncHandler from "../../../utilities/ayncHandler";
import { Request, Response } from "express";
import { loginSchema } from "../../../zodSchemasValidation/userSchema";
import bcrypt from "bcrypt"
import jwt  from "jsonwebtoken";
const client = new PrismaClient();

const login = asyncHandler(async (req: Request, res: Response) => {
  const userInput = await loginSchema.parseAsync(req.body);

  const validIdentifier = await client.user.findFirst({
    where: {
      OR: [{ email: userInput.identifier }, { userName: userInput.identifier }],
    },
  });

  if(!validIdentifier){
    res.status(400).json({message:"Invalid credentials "})
    return
  }

  const validPassword =await bcrypt.compare(userInput.password, validIdentifier!.password)
  if (!validPassword) {
    res.status(400).json({message:"Invalid credentials"})
    return
    
  }
  const {isDeleted,password, ...mainDetails}= validIdentifier

  const token = jwt.sign(mainDetails, process.env.SECRET_KEY!, {
    expiresIn: "2h",
  });
  res
    .cookie("authTokencodey", token, {
      // httpOnly: true,
      // secure: true,
      // sameSite: "none",   
     })

    .json({ data:mainDetails,message: "Login sucessful" });

  return;

});

export default login;
