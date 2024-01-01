import UserService from "../application/user/userService";
import {NextFunction, Request, Response} from 'express';
import UserDto from "../controller/dto/userDto";
import {inject, injectable} from "inversify";
import Identifier from "../config/identifier";

@injectable()
export class UserController{
    private userService: UserService;

    constructor(@inject(Identifier.UserService) userService: UserService) {
        this.userService = userService;
    }

    getAllUsers = async (req : Request, res : Response, next : NextFunction) => {
        try {
            const users = await this.userService.getAllUsers();
            res.status(200).send(users);
        } catch (e : any) {
            next(e)
        }
    }

    addUser = async (req : Request, res : Response, next: NextFunction) => {
        const addUserDto : UserDto = req.body;
        try {
            const {name, email, password} = addUserDto;
            const user = await this.userService.createUser(name, email, password);
            const header = {Location: `/user/${user.id}`};
            res.status(201).set(header).send(user);
        } catch (e : any) {
            next(e);
        }
    }

    deleteUser = async (req : Request, res : Response, next: NextFunction) => {
        const id = req.params.id;
        try {
            await this.userService.deleteUser(id);
            res.status(200).send();
        } catch (e : any) {
            next(e)
        }
    }

    getUser = async (req : Request, res : Response, next: NextFunction) => {
        const id = req.params.id;
        try {
            const user = await this.userService.getUser(id);
            res.status(200).send(user);
        } catch (e : any) {
            next(e)
        }
    }

    updateUser = async (req : Request, res : Response, next: NextFunction) => {
        const id = req.params.id;
        const updateUserDto : UserDto = req.body;
        try {
            const {name, email, password} = updateUserDto;
            const user = await this.userService.updateUser(id, name, email, password);
            res.status(200).send(user);
        } catch (e : any) {
            next(e)
        }
    }
}