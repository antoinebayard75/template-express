import Exception from "../../../exceptions/exception";

export default class FileNotFoundException extends Exception {
    constructor() {
        super(404, "File not found");
    }
}