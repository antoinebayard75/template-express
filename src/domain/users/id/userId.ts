import {randomUUID} from "crypto";
import {IUserId} from "./IUserId";

export class UserId implements IUserId{
    private readonly id: string;

    public constructor(id: string) {
        this.id = id;
    }

    public static generate(): UserId {
        const id = randomUUID().toString();
        return new UserId(id);
    }

    public toString(): string {
        return this.id;
    }
}