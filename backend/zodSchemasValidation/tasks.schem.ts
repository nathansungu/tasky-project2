import {z }from "zod";

const createTaskSchema = z.object({
    title: z.string(),
    description: z.string(),
    deadLine: z.string().optional(),
    urgency: z.int().optional(),
    groupId: z.string().optional()

})

const updateTaskSchema = z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    deadLine: z.string().optional(),
    urgency: z.number().optional()
    
})

export {
    createTaskSchema,
    updateTaskSchema
}