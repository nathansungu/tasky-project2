import { NextFunction, Request, Response } from "express";
import asyncHandler from "../../utilities/ayncHandler";
import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";
import { UserPayload } from "../types/types";

const authenticateLogin = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { authTokencodey } = req.cookies;

    if (!authTokencodey) {
      res.status(400).json({ message: "Unaothorised: Login to proceed" });
      return;
    }
    jwt.verify(
      authTokencodey,
      process.env.SECRET_KEY!,
      (err: VerifyErrors | null, decoded: JwtPayload | string | undefined) => {
        if (err) {
          res.status(400).json({ message: "Unaothorised: Login to proceed" });
          return;
        }
        req.user = decoded as UserPayload;
      }
    );
    next()
  }
);

export default authenticateLogin;
