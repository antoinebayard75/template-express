import {injectable} from "inversify";
import {Request, Response} from "express";
@injectable()
export default class UploadController{
    async upload(req: Request, res: Response) {
        res.send("upload")
    }
}