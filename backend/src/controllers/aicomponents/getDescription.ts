import OpenAI from "openai";
import asyncHandler from "../../../utilities/ayncHandler";
import { Request, Response } from "express-serve-static-core";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

const getDescription = asyncHandler( async (req:Request, res:Response)=>{
    const body= req.body;
    // const value =body&&body.taskTitle?`describe to do task ${body.taskTitle}  in 5 lines`:body.customDescription;

  const result = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: `describe to do task ${body&&body.title}  in 5 lines` }],
  });
  const data =result.choices[0].message.content
  return res.status(200).json({data: data})
})

export default getDescription;
