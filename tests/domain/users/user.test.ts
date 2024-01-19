import {Password} from "../../../src/domain/users/password/password";
import {Email} from "../../../src/domain/users/email/email";
import User from "../../../src/domain/users/user";

describe("User", ()=>{
    const id = "1";
    const username = "username";
    const password : Password = Password.create("admin123");
    const email : Email = new Email("johndoe@gmail.com");

    it("Should return a User instance", ()=>{
        const user = new User(id,username, email, password);
        expect(user).toBeInstanceOf(User);
    })

    it("Verify password with same string password should return true", function () {
        const user = new User(id,username, email, password);
        user.checkPassword("admin123").then((result : boolean) => {
            expect(result).toBeTruthy();
        });
    });

    it("Verify password with different string password should return false", function () {
        const user = new User(id,username, email, password);
        user.checkPassword("differentPassword").then((result : boolean) => {
            expect(result).toBeFalsy();
        });
    });

    it("to Payload should return a UserPayload instance", ()=>{
        const user = new User(id,username, email, password);
        const userPayload = user.toPayload();
        expect(userPayload).toHaveProperty("id");
        expect(userPayload).toHaveProperty("name");
        expect(userPayload).toHaveProperty("email");
    })
})