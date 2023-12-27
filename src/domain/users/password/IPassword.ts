export interface IPassword {
    verify(password: string): Promise<boolean>;
    changePassword(password: string): void;
    getHash(): string;
}