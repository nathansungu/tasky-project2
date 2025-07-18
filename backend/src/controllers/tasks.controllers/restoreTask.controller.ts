import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import asyncHandler from '../../../utilities/ayncHandler';
const client = new PrismaClient();

const restoreTask = asyncHandler( async(req:Request, res:Response)=>{
    const userId = req.user!.id;
    const {id}= req.params;
    const restoredTask = await client.tasks.update({
        where:{userId: userId, id:id },
        data:{isDeleted:false}
    })

    res.status(200).json({message: "Task restored successfully"})
})


export default restoreTask