import {User} from "../../domain/users/user";
import {UserResponse} from "./userResponse";

export class UserAssembler{
    toResponse(user: User): UserResponse{
        return {
            id: user.getIdAsString(),
            name: user.getName(),
            email: user.getEmail(),
            password: user.getPassword()
        }
    }
}