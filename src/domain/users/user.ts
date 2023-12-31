import {IUserId} from "./id/IUserId";
import {IPassword} from "./password/IPassword";
import {Password} from "./password/password";
import {Email} from "./email/email";
import UserPayload from "./userPayload";

export default class User {
  private readonly id: IUserId;
  private readonly name: string;
  private readonly email: Email;
  private password: IPassword;

  constructor(id: IUserId, name : string, email : Email, password : Password) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }
    getIdAsString() : string {
        return this.id.toString();
    }
    getName() : string {
        return this.name;
    }
    getEmail() : string {
        return this.email.toString();
    }
    getPassword() : string {
        return this.password.getHash();
    }
    async checkPassword(password : string) : Promise<boolean> {
        return await this.password.verify(password);
    }
    toPayload() : UserPayload {
        return {
            id: this.getIdAsString(),
            name: this.getName(),
            email: this.getEmail()
        }
    }
}
