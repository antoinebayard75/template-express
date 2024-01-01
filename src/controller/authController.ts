import {inject, injectable} from "inversify";
import {NextFunction, Request, Response} from 'express';
import AuthService from "../application/auth/authService";
import Identifier from "../config/identifier";

@injectable()
export class AuthController{
    private authService: AuthService;

    constructor(@inject(Identifier.AuthService) authService: AuthService) {
        this.authService = authService;
    }
    login = async (req : Request, res : Response, next: NextFunction) => {
        const {email, password} = req.body;
        try {
            const user = await this.authService.login(email, password);
            res.status(200).send(user);
        } catch (e : any) {
            next(e);
        }
    }

    tokenInfo = async (req : Request, res : Response, next: NextFunction) => {
        const token = req.headers.authorization as string;
        try {
            const user = await this.authService.tokenInfo(token);
            res.status(200).send(user);
        } catch (e : any) {
            next(e);
        }
    }
}

