export class Email {
  private readonly email: string;

  constructor(email: string) {
    const regex = /\S+@\S+\.\S+/;
    if(!regex.test(email)) throw new Error("Invalid email");

    this.email = email.toLowerCase();
  }

  toString(): string {
    return this.email;
  }
}