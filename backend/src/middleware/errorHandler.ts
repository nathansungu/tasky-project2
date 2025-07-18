import { NextFunction, Request, Response } from "express";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { Prisma } from "@prisma/client";
import { ZodError } from "zod";
const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    console.error(error);

    switch (error.code) {
      case 'P1001':
        res.status(500).json({message:"Server is off"});

        break;
      case 'P2002':
        const target = error.meta?.target;
        res.status(409).json({message:`${target} is taken `});
        break;

      default:
        res.status(500).json({ message: "Oops!  something went wrong." });
        break;
        
    }

  } else if (error instanceof ZodError) {
    const our = error.issues
    
    const {
      message,
      path: [filed],
      code
    } = error.issues[0]

    console.log(error);
    switch (code) {
      case "invalid_type":
        res.status(400).json({ message: `${error.issues[0].path} is ${message}` });
        return;
      case "too_small":
        res.status(400).json({ message: ` ${error.issues[0].path} is too short` });
        return;
      case "too_big":
        res.status(400).json({ message: "Input is too big" });
        return;
      case "invalid_union":
        res.status(400).json({ message: "Invalid union type" });
        return;
      default:
        res.status(400).json({ message: "Validation error" });
        return;
    }
  } else {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
    return;
  }
};

export default errorHandler;
