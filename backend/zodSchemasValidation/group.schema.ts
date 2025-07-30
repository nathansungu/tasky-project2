import z from "zod";

export const createGroupSchema = z.object({
    name: z.string(),
    description: z.string(),
    imgUrl: z.string().optional()
})
export const addGroupMemberSchema = z.object({
    userId: z.string(),
    groupId: z.string()
})

