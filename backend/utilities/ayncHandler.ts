import { Request, Response,NextFunction } from "express"

const asyncHandler =  (func:Function)=>{
    return async (req:Request, res:Response, next:NextFunction)=>{
        try {
            await func(req, res, next )
        } catch (error) {
            next (error)            
        }


    }

}

export default asyncHandler;