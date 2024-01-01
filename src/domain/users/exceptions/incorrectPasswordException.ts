import Exception from "../../../exceptions/exception";

export default class IncorrectPasswordException extends Exception {
    constructor() {
        super(400, "Incorrect password");
    }
}