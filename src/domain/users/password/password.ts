import bcrypt from 'bcrypt';
import {IPassword} from "./IPassword";

export class Password implements IPassword {
    private hashedPassword: string;

    constructor(password: string) {
        this.hashedPassword = password;
    }

    async verify(password: string): Promise<boolean> {
        return await bcrypt.compare(password, this.hashedPassword);
    }

    changePassword(password: string): void {
        this.hashedPassword = bcrypt.hashSync(password, 10);
    }

    getHash(): string {
        return this.hashedPassword;
    }

    static create(password: string): Password {
        const hashedPassword = bcrypt.hashSync(password, 10);
        return new Password(hashedPassword);
    }
}