import {IToken} from "../../domain/token/IToken";
import {tokenResponse} from "./tokenResponse";


export class TokenAssembler {
    toResponse(token : IToken) : tokenResponse{
        return {
            token: token.sign()
        }
    }
}