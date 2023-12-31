import {inject, injectable} from "inversify";
import IUserRepo from "../../domain/users/IUserRepo";
import tokenResponse from "./tokenResponse";
import TokenAssembler from "./tokenAssembler";
import IToken from "../../domain/token/IToken";
import Token from "../../domain/token/token";
import Identifier from "../../config/identifier";

@injectable()
export default class AuthService{
    private userRepo: IUserRepo;
    private tokenAssembler = new TokenAssembler();

    constructor(@inject(Identifier.UserRepo) userRepo: IUserRepo) {
        this.userRepo = userRepo;
    }

    async login(email: string, password: string) : Promise<tokenResponse> {
        const user = await this.userRepo.findOneByEmail(email);
        if (!user) {
            throw new Error("User not found");
        }
        const passwordVerified = await user.checkPassword(password);
        if (!passwordVerified) {
            throw new Error("Invalid password");
        }
        const token : IToken = new Token(user.toPayload());

        return this.tokenAssembler.toResponse(token);
    }

    async tokenInfo(token: string) {
        try {
            const decodedToken : IToken = Token.fromString(token);
            return decodedToken.getPayload();
        }catch (e : any) {
            throw new Error("Invalid token");
        }
    }
}