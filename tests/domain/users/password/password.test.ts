import {Password} from "../../../../src/domain/users/password/password";

describe("Password", function () {
    const STRING_PASSWORD : string = "myPassword123!";
    it("Static create should return a Password instance", function () {
        const password : Password = Password.create(STRING_PASSWORD);
        expect(password).toBeInstanceOf(Password);
    });

    it("Verify password with same string password should return true", function () {
        const password : Password = Password.create(STRING_PASSWORD);
        password.verify(STRING_PASSWORD).then((result : boolean) => {
            expect(result).toBeTruthy();
        });
    });

    it("Verify password with different string password should return false", function () {
        const password : Password = Password.create(STRING_PASSWORD);
        password.verify("differentPassword").then((result : boolean) => {
            expect(result).toBeFalsy();
        });
    });


});