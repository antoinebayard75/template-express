import { Request, Response, NextFunction } from 'express';
import Exception from "../exceptions/exception";

const ErrorMiddleware = (err : Exception, req : Request, res : Response, next : NextFunction) => {
    try{
        const status: number = err.status || 500;
        const message: string = err.message || 'Something went wrong';
        res.status(status).json({ "errorMessage" : message });
    }catch (error: any){
        next(error)
    }
}

export default ErrorMiddleware;