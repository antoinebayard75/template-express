import {injectable} from "inversify";
import IUserRepo from "../../domain/users/IUserRepo";
import User from "../../domain/users/user";

@injectable()
export default class UserRepoInMemory implements IUserRepo{
    private users = new Map<string, User>();

    async save(user: User): Promise<User> {
        this.users.set(user.getIdAsString(), user);
        return user;
    }

    async findOneById(id: string): Promise<User | null> {
        return this.users.get(id) ?? null;
    }

    async findOneByEmail(email: string): Promise<User | null> {
        for (const user of this.users.values()) {
            if (user.getEmail() === email) {
                return user;
            }
        }
        return null;
    }

    async findAll(): Promise<User[]> {
        return Array.from(this.users.values());
    }

    deleteUser(id: string): Promise<boolean> {
        if(this.users.has(id)){
            this.users.delete(id);
            return Promise.resolve(true);
        }
        return Promise.resolve(false);
    }




}