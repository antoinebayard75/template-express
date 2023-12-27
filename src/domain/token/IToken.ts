import {UserPayload} from "../users/userPayload";

export interface IToken {
    sign() : string;
    getPayload() : UserPayload;
}