import {Email} from "../../../../src/domain/users/email/email";

describe("Email", () => {
    const VALID_EMAIL = "johndoe@gmail.com";
    const INVALID_EMAIL = "johndoe@gmail";

    it("Given a valid email should not throw error", () => {
        expect(() => new Email(VALID_EMAIL)).not.toThrow();
    });

    it("Given an invalid email should throw error", () => {
        expect(() => new Email(INVALID_EMAIL)).toThrow();
    });

});