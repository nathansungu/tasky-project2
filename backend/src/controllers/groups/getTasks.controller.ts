import { PrismaClient } from "@prisma/client";
import asyncHandler from "../../../utilities/ayncHandler";
import { Request, Response } from "express";

const client = new PrismaClient()

const groupTasks = asyncHandler(async(req:Request, res:Response)=>{
    const {groupId} = req.params;
    const tasks = await client.tasks.findMany({
        where:{groupId:groupId, isDeleted:false}
    })
    if (tasks.length==0) {
        res.status(200).json({message:"Add Task To See Them"}) 
        return       
    }

    return res.status(200).json({data:tasks})
})

export default groupTasks;