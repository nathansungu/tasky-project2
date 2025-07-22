import z from "zod";

export const createGroupSchema = z.object({
    name: z.string(),
    description: z.string()
})
export const addGroupMemberSchema = z.object({
    userId: z.string(),
    groupId: z.string()
})

