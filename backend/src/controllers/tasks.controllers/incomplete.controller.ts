import { PrismaClient } from "@prisma/client";
import asyncHandler from "../../../utilities/ayncHandler";
import { Request, Response } from "express";

const client = new PrismaClient()
const markInComplete = asyncHandler(async(req:Request, res:Response)=>{
    const {id}= req.params;
    await client.tasks.update({
        where:{id:id},
        data:{iscompleted:false}
    })

    res.status(200).json({message:"Tasks marked as incomplete"})
    return
})

export default markInComplete;