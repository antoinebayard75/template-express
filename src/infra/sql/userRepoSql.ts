import IUserRepo from "../../domain/users/IUserRepo";
import {RowDataPacket} from "mysql2";
import User from "../../domain/users/user";
import {connection} from "../../db";
import UserFactory from "../../domain/users/userFactory";
import {injectable} from "inversify";

@injectable()
export default class UserRepoSql implements IUserRepo{
    private userFactory = new UserFactory();

    async save(User: User): Promise<User> {
        const id = User.getIdAsString();
        const name = User.getName();
        const email = User.getEmail();
        const password = User.getPassword();
        const userAlreadyExists = await this.findOneById(id);

        if(userAlreadyExists){
            return new Promise((resolve, reject) => {
                connection.query<RowDataPacket[]>(
                    "UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?",
                    [name, email, password],
                    (err, res) => {
                        if (err) reject(err);
                        else{
                            console.log("User updated successfully");
                        }
                        this.findOneById(id)
                            .then((tutorial) => resolve(tutorial!))
                            .catch(reject);
                    }
                );
            });
        }
        return new Promise((resolve, reject) => {
            connection.query<RowDataPacket[]>(
                "INSERT INTO users (id, name, email, password) VALUES(?,?,?,?)",
                [id, name, email, password],
                (err, res) => {
                    if (err) reject(err);
                    else{
                        console.log("User added successfully");
                    }
                        this.findOneById(id)
                            .then((tutorial) => resolve(tutorial!))
                            .catch(reject);
                }
            );
        });
    }

    async findOneById(id: string): Promise<User | null> {
        return new Promise((resolve, reject) => {
            connection.query<RowDataPacket[]>("SELECT * FROM users WHERE id = ?",
                [id],
                (err, res) => {
                    if (err) reject(err);
                    else {
                        const userRow = res[0];
                        if (userRow === undefined) resolve(null);
                        else {
                            const user = this.userFactory.create(userRow.id, userRow.name, userRow.email, userRow.password)

                            resolve(user);
                        }
                    }
                }
            );
        });
    }

    async findOneByEmail(email: string): Promise<User | null> {
        return new Promise((resolve, reject) => {
            connection.query<RowDataPacket[]>("SELECT * FROM users WHERE email = ?",
                [email],
                (err, res) => {
                    if (err) reject(err);
                    else {
                        if (res[0] === undefined) resolve(null);
                        else {
                            const row = res[0];
                            const user = this.userFactory.create(row.id, row.name, row.email, row.password)

                            resolve(user);
                        }
                    }
                }
            );
        });
    }

    deleteUser(id: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            connection.query<RowDataPacket[]>("DELETE FROM users WHERE id = ?",
                [id],
                (err, res) => {
                    if (err) reject(err);
                    else {
                        if (!res) resolve(false);
                        else {
                            resolve(true);
                        }
                    }
                }
            );
        });
    }

    async findAll(): Promise<User[]> {
        return new Promise((resolve, reject) => {
            connection.query<RowDataPacket[]>("SELECT * FROM users",
                (err, res) => {
                    if (err) reject(err);
                    else {
                        const users: User[] = [];
                        for (let user of res) {
                            users.push(this.userFactory.create(user.id, user.name, user.email, user.password));
                        }
                        resolve(users);
                    }
                }
            );
        });
    }
}