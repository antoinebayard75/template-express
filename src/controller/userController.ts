import {UserService} from "../application/user/userService";
import {Request, Response} from 'express';
import {inject, injectable} from "inversify";
import {Identifier} from "../config/identifier";

@injectable()
export class UserController{
    private userService: UserService;

    constructor(@inject(Identifier.UserService) userService: UserService) {
        this.userService = userService;
    }

    getAllUsers = async (req : Request, res : Response) => {
        try {
            const users = await this.userService.getAllUsers();
            res.status(200).send(users);
        } catch (e : any) {
            res.status(400).send(e.message);
        }
    }

    addUser = async (req : Request, res : Response) => {
        const {name, email, password} = req.body;
        try {
            const user = await this.userService.createUser(name, email, password);
            const header = {Location: `/user/${user.id}`};
            res.status(201).set(header).send(user);
        } catch (e : any) {
            res.status(400).send(e.message);
        }
    }

    deleteUser = async (req : Request, res : Response) => {
        const id = req.params.id;
        try {
            await this.userService.deleteUser(id);
            res.status(200).send();
        } catch (e : any) {
            res.status(400).send(e.message);
        }
    }

    getUser = async (req : Request, res : Response) => {
        const id = req.params.id;
        try {
            const user = await this.userService.getUser(id);
            res.status(200).send(user);
        } catch (e : any) {
            res.status(400).send(e.message);
        }
    }

    updateUser = async (req : Request, res : Response) => {
        const id = req.params.id;
        const {name, email, password} = req.body;
        try {
            const user = await this.userService.updateUser(id, name, email, password);
            res.status(200).send(user);
        } catch (e : any) {
            res.status(400).send(e.message);
        }
    }
}