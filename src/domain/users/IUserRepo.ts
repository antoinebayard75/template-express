import { User } from "./user";

export interface IUserRepo {
    save(User: User): Promise<User>
    findAll(): Promise<User[]>
    findOneByEmail(email: string): Promise<User | null>
    findOneById(id: string): Promise<User | null>
    deleteUser(id: string): Promise<boolean>
}
