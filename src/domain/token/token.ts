import jwt, {Secret} from 'jsonwebtoken';
import {IToken} from "./IToken";
import dotenv from "dotenv";
import {UserPayload} from "../users/userPayload";

dotenv.config();

export class Token implements IToken {
    private readonly payload: UserPayload;

    public constructor(payload : UserPayload) {
        this.payload = payload;
    }

    sign() : string{
        const secret : Secret | undefined = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error('JWT secret is not defined.');
        }
        return jwt.sign(this.payload, secret, { expiresIn: '1d' }).toString();
    }

    static fromString(token: string) : IToken{
        const secret : Secret | undefined = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error('JWT secret is not defined.');
        }
        const payload = jwt.verify(token, secret);
        return new Token(payload as UserPayload);
    }

    getPayload() : UserPayload {
        return this.payload;
    }
}