import InvalidEmailException from "../exceptions/invalidEmailException";

export class Email {
  private readonly email: string;

  constructor(email: string) {
    const regex = /\S+@\S+\.\S+/;
    if(!regex.test(email)) throw new InvalidEmailException();

    this.email = email.toLowerCase();
  }

  toString(): string {
    return this.email;
  }
}