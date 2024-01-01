import Exception from "../../../exceptions/exception";

export default class UserAlreadyExistException extends Exception {
    constructor() {
        super(400, "User already exist");
    }
}