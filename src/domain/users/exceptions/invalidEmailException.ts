import Exception from "../../../exceptions/exception";

export default class InvalidEmailException extends Exception {
    constructor() {
        super(400, "Invalid email format");
    }
}