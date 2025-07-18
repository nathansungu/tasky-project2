import { Request, Response } from "express";
import asyncHandler from "../../../utilities/ayncHandler";

const logout = asyncHandler(async(_req:Request, res:Response)=>{
    res.clearCookie("authTokencodey")
    res.status(200).json({ message: "Loged out successfuly" });
})

export default logout;