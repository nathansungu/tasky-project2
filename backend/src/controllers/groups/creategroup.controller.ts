import { PrismaClient } from "@prisma/client";
import { Request,Response } from "express";
import asyncHandler from "../../../utilities/ayncHandler";
import {createGroupSchema} from "../../../zodSchemasValidation/group.schema";

const client = new PrismaClient();

const createGroup= asyncHandler(async(req: Request, res:Response )=>{
    const userId = req.user!.id;
    const groupdetails = await createGroupSchema.parseAsync(req.body)
    const newGgroup =  await client.group.create({
        data:groupdetails
    })
    if(newGgroup){
        await client.groupMembers.create({
        data:{userId:userId, role:"admin", groupId:newGgroup.id}
    })

    }
    

    return res.status(201).json({message:"Group created Succesfully", data: newGgroup.id})
})

export default createGroup;