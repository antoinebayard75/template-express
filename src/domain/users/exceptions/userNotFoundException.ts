import Exception from "../../../exceptions/exception";

export default class UserNotFoundException extends Exception {
    constructor() {
        super(404, "User not found");
    }
}