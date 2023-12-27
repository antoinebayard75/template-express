import {inject, injectable} from "inversify";
import {Request, Response} from 'express';
import {AuthService} from "../application/auth/authService";
import {Identifier} from "../identifier";

@injectable()
export class AuthController{
    private authService: AuthService;

    constructor(@inject(Identifier.AuthService) authService: AuthService) {
        this.authService = authService;
    }
    login = async (req : Request, res : Response) => {
        const {email, password} = req.body;
        try {
            const user = await this.authService.login(email, password);
            res.status(200).send(user);
        } catch (e : any) {
            res.status(400).send(e.message);
        }
    }

    tokenInfo = async (req : Request, res : Response) => {
        const token = req.headers.authorization as string;
        try {
            const user = await this.authService.tokenInfo(token);
            res.status(200).send(user);
        } catch (e : any) {
            res.status(400).send(e.message);
        }
    }
}

