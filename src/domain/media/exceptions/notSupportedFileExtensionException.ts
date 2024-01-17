import Exception from "../../../exceptions/exception";


export default class NotSupportedFileExtensionException extends Exception {
    constructor() {
        super(400, "File type is not supported");
    }
}