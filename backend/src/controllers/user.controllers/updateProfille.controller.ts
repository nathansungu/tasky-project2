import { PrismaClient } from "@prisma/client";
import asyncHandler from "../../../utilities/ayncHandler";
import { updateProfileSchema } from "../../../zodSchemasValidation/userSchema";
import { Request, Response } from "express";

const client = new PrismaClient();

const updateProfile = asyncHandler( async (req:Request, res:Response)=>{
    const userId = req.user!.id
    const userData = await updateProfileSchema.parseAsync(req.body)
    const updatedProfile = await client.user.update({
        where:{id:userId},
        data:userData&&userData
    })

    res.status(200).json({
        message:"Profile updated succesfully"
    })
})

export default updateProfile;