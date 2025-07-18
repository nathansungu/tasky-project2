 export interface UserPayload {
    id: string;
    firstName: string;
    lastName: string;
    emailAddres: string; 
    userName: string;
    isDeleted: boolean;
}
declare global {
    namespace Express {
        interface Request {
            user?: UserPayload; 
            token?: string; 
        }
    }
}