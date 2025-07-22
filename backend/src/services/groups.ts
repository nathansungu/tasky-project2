import { PrismaClient } from "@prisma/client";
import asyncHandler from "../../utilities/ayncHandler";
const client = new PrismaClient()

const undoneTasks = async(groupId:string)=>{
    const tasks= await client.tasks.findMany({
        where:{groupId:groupId, iscompleted:false}
    })

    return tasks.length
}

export default undoneTasks;