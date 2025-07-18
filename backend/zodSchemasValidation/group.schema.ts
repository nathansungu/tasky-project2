import z from "zod";

const createGroupSchema = z.object({
    name: z.string(),
    description: z.string()
})

export default createGroupSchema;