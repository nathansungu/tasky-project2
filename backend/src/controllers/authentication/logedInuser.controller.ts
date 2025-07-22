import { Request, Response } from "express";
import asyncHandler from "../../../utilities/ayncHandler";
const logedinUser = asyncHandler(async (req: Request, res: Response) => {
  const user = req.user;
  if (user) {
    res.status(200).json({ data: user });
  }
});

export default logedinUser;
