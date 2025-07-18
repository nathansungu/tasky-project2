import { PrismaClient } from "@prisma/client";
import asyncHandler from "../../../utilities/ayncHandler";
import { Request, Response } from "express";

const client = new PrismaClient()

const groupTasks = asyncHandler(async(req:Request, res:Response)=>{
    const {groupId} = req.params;
    const tasks = await client.tasks.findMany({
        where:{groupId:groupId}
    })

    return res.status(200).json({message:" Tasks added ", data:tasks})
})

export default groupTasks;