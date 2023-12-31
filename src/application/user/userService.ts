import IUserRepo from "../../domain/users/IUserRepo";
import UserFactory from "../../domain/users/userFactory";
import {UserId} from "../../domain/users/id/userId";
import {inject, injectable} from "inversify";
import {Password} from "../../domain/users/password/password";
import UserAssembler from "./userAssembler";
import UserResponse from "./userResponse";
import Identifier from "../../config/identifier";

@injectable()
export default class UserService {
    private userRepo: IUserRepo;
    private userAssembler = new UserAssembler();
    private userFactory = new UserFactory();

    constructor(@inject(Identifier.UserRepo) userRepo: IUserRepo) {
        this.userRepo = userRepo;
    }

    async createUser(name : string, email : string, password : string) : Promise<UserResponse> {
        const user = await this.userRepo.findOneByEmail(email);
        if (user) {
            throw new Error("User already exists");
        }
        const id = UserId.generate();
        const passwordHash = Password.create(password).getHash();
        let newUser = this.userFactory.create(id.toString(), name, email, passwordHash);
        newUser = await this.userRepo.save(newUser);

        return this.userAssembler.toResponse(newUser);
    }

    async getUser(id : string) : Promise<UserResponse> {
        const user = await this.userRepo.findOneById(id);
        if (!user) {
            throw new Error("User not found");
        }
        return this.userAssembler.toResponse(user);
    }

    async deleteUser(id : string) : Promise<boolean> {
        const user = await this.userRepo.findOneById(id);
        if (!user) {
            return false;
        }
        return await this.userRepo.deleteUser(id);
    }


    async updateUser(id: string, name: any, email: any, password: any) : Promise<UserResponse> {
        const user = await this.userRepo.findOneById(id);
        if (!user) {
            throw new Error("User not found");
        }
        const passwordHash = new Password(password).getHash();
        let newUser = this.userFactory.create(id, name, email, passwordHash);
        newUser = await this.userRepo.save(newUser);

        return this.userAssembler.toResponse(newUser);
    }

    async getAllUsers() {
        const users = await this.userRepo.findAll();
        return users.map((user) => this.userAssembler.toResponse(user));
    }
}