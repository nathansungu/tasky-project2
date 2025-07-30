import { PrismaClient } from "@prisma/client";
import asyncHandler from "../../../utilities/ayncHandler";
import { Request, Response } from "express";

const client = new PrismaClient()

const markComplete = asyncHandler(async(req:Request, res:Response)=>{
    const id= req.user?.id;

    const completeTask = await client.tasks.update({
        where:{id:id},
        data:{iscompleted:true}
    })

    res.status(200).json({message:"Task Completed"})
    return    
})

export default markComplete;