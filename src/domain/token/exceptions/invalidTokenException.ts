import Exception from "../../../exceptions/exception";

export default class InvalidTokenException extends Exception {
    constructor() {
        super(400, "Invalid token");
    }
}