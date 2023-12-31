import IToken from "../../domain/token/IToken";
import tokenResponse from "./tokenResponse";


export default class TokenAssembler {
    toResponse(token : IToken) : tokenResponse{
        return {
            token: token.sign()
        }
    }
}