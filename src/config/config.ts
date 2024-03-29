import 'reflect-metadata';
import IUserRepo from "../domain/users/IUserRepo";
import UserRepoSql from "../infra/sql/userRepoSql";
import {Container} from "inversify";
import UserService from "../application/user/userService";
import UserController from "../controller/userController";
import AuthController from "../controller/authController";
import AuthService from "../application/auth/authService";
import Identifier from "./identifier";
import MediaService from "../application/upload/mediaService";
import MediaController from "../controller/mediaController";

export default class Config{
    private static instance : Config | null = null;
    private readonly container : Container;

    private constructor() {
        this.container = new Container();
        this.init();
    }

    static getContainer() {
        if (!this.instance) {
            this.instance = new Config();
        }
        return this.instance.container;
    }
    private init() {
        // MediaController
        this.container.bind<MediaService>(Identifier.MediaService).to(MediaService);
        this.container.bind<MediaController>(Identifier.MediaController).to(MediaController);

        // UserController
        this.container.bind<UserService>(Identifier.UserService).to(UserService);
        this.container.bind<UserController>(Identifier.UserController).to(UserController);

        // AuthController
        this.container.bind<AuthService>(Identifier.AuthService).to(AuthService);
        this.container.bind<AuthController>(Identifier.AuthController).to(AuthController);

        // Repo
        this.container.bind<IUserRepo>(Identifier.UserRepo).to(UserRepoSql);
    }
}


