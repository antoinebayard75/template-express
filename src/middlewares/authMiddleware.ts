import {Request, Response, NextFunction} from "express";
import Token from "../domain/token/token";

const AuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token : string | undefined = req.headers.authorization;
    if(!token)
        return res.status(401).json({errorMessage: "No token provided"});
    try {
        Token.fromString(token);
        next()
    }catch (e: any) {
        return res.status(401).json({errorMessage: "Invalid token"})
    }
}

export default AuthMiddleware;