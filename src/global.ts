import path from "path";

export default class Global{
    public static readonly DIRNAME = __dirname;
    public static readonly MEDIA_FOLDER_NAME = "uploads";
    public static readonly MEDIA_ABSOLUTE_PATH = path.join(this.DIRNAME, this.MEDIA_FOLDER_NAME);
    public static readonly DEFAULT_ROUTE = "";
}