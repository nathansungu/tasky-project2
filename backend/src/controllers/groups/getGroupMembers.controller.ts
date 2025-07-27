import { PrismaClient } from '@prisma/client';
import asyncHandler from '../../../utilities/ayncHandler';
import { Request, Response } from 'express';

const client = new PrismaClient()

const getMembers = asyncHandler(async (req:Request, res:Response)=>{
    const {id} = req.params;
    const members = await client.groupMembers.findMany({
        where:{groupId:id},
        include:{
            user:{
                select:{
                    firstName: true,
                    secondName:true
                }
            }
        }
    })

    if (members.length==0) {
        res.status(200).json({message:"Add members to see them"})
        return
    }
    return res.status(200).json({
        data:members
    })
})

export default getMembers