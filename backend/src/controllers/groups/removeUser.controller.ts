import { PrismaClient } from '@prisma/client';
import asyncHandler from '../../../utilities/ayncHandler';
import { Request, Response } from 'express';
const client = new PrismaClient()
const removeUser = asyncHandler(async(req:Request, res:Response)=>{
    const userId = req.user!.id
    const {id }= req.params
    const user = await client.groupMembers.update({
        where:{id:id, userId:userId,},
        data:{isDeleted:true}
    })

    if (user) {
        res.status(200).json({message:"User deleted succesfuly"})
        return
    }

    return res.status(400).json({Message:" Failed to delete user"})
})

export default removeUser;