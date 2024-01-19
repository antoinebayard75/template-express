import Token from "../../../src/domain/token/token";
import UserPayload from "../../../src/domain/users/userPayload";


describe("Token", () => {
    const userPayload : UserPayload = {
        id: "1",
        name: "John Doe",
        email: "johndoe@gmail.com",
    }

    it("Can create a Token object with a user payload", () => {
        const token = new Token(userPayload);
        expect(token).toBeInstanceOf(Token);
    });

    it("Can sign a token", () => {
        const token = new Token(userPayload);
        const signedToken = token.sign();
        expect(signedToken).toBeTruthy();
    });

    it("Can create a Token object from a string", () => {
        const token = new Token(userPayload);
        const signedToken = token.sign();
        const tokenFromString = Token.fromString(signedToken);
        expect(tokenFromString).toBeInstanceOf(Token);
    });
    it("Can get the payload from a token", () => {
        const token = new Token(userPayload);
        const signedToken = token.sign();
        const tokenFromString = Token.fromString(signedToken);
        const payload = tokenFromString.getPayload();
        expect(payload.id).toEqual(userPayload.id);
        expect(payload.name).toEqual(userPayload.name);
        expect(payload.email).toEqual(userPayload.email);
    });
    it("Two differents payloads should not be equal", () => {
        const token = new Token(userPayload);
        const signedToken = token.sign();
        const otherUserPayload: UserPayload = {
            id: "2",
            name: "Bob Doe",
            email: "bobdoe@gmail.com"
        }
        const otherToken = new Token(otherUserPayload);
        const otherSignedToken = otherToken.sign();
        expect(signedToken).not.toEqual(otherSignedToken);
    });


});