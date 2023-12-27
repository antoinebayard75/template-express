import {User} from "./user";
import {UserId} from "./id/userId";
import {Email} from "./email/email";
import {Password} from "./password/password";



export class UserFactory{
    create(id : string, name: string, email: string, password: string): User{
        const userId = new UserId(id);
        const userEmail = new Email(email);
        const userPassword = new Password(password);

        return new User(userId, name, userEmail, userPassword)
    }
}