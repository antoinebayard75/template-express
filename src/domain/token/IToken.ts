import UserPayload from "../users/userPayload";

export default interface IToken {
    sign() : string;
    getPayload() : UserPayload;
}