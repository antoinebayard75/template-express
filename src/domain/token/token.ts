import jwt, {Secret} from 'jsonwebtoken';
import {IToken} from "./IToken";
import dotenv from "dotenv";

dotenv.config();

export class Token implements IToken {
    private readonly payload: any;

    public constructor(payload : any) {
        this.payload = payload;
    }

    sign() {
        const secret : Secret | undefined = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error('JWT secret is not defined.');
        }
        return jwt.sign(this.payload, secret, { expiresIn: '1d' });
    }

    static fromString(token: string) : IToken{
        const secret : Secret | undefined = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error('JWT secret is not defined.');
        }
        const payload = jwt.verify(token, secret);
        return new Token(payload);
    }

    getPayload() {
        return this.payload;
    }
}