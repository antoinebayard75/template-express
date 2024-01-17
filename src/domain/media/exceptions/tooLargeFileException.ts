import Exception from "../../../exceptions/exception";

export default class TooLargeFileException extends Exception {
    constructor() {
        super(400, "File is too large");
    }
}