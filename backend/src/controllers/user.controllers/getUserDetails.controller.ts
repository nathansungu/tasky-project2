import { PrismaClient } from "@prisma/client";
import asyncHandler from "../../../utilities/ayncHandler";
import { Request, Response } from "express";
const client = new PrismaClient()

const users= asyncHandler(async(req:Request, res:Response)=>{
    const userDetails = await client.user.findMany()
    if (userDetails.length==0) {
        res.status(400).json({message:"Create connections to see people"})
        return
        
    }
    return res.status(200).json({data:userDetails})
})

export default users;