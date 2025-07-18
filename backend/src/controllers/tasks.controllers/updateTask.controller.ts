import { PrismaClient } from "@prisma/client";
import asyncHandler from "../../../utilities/ayncHandler";
import { Request, Response } from "express";
import { updateTaskSchema } from "../../../zodSchemasValidation/tasks.schem";
const client = new PrismaClient();

const updateTask = asyncHandler( async(req:Request, res:Response)=>{
    const {id} = req.params;
    const userInput = await updateTaskSchema.parseAsync(req.body)
    const updatedTask = await client.tasks.update({
        where:{id:id},
        data:userInput&&userInput
    })

    return res.status(200).json({message: "Product updated successfuly"})
})

export default updateTask;