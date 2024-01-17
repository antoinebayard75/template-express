import Exception from "../../../exceptions/exception";

export default class MissingFileException extends Exception {
    constructor() {
        super(400, "Missing file in the request");
    }
}