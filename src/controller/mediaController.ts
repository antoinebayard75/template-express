import {inject, injectable} from "inversify";
import {NextFunction, Request, Response} from "express";
import MediaService from "../application/upload/mediaService";
import Identifier from "../config/identifier";
import pathDto from "./dto/pathDto";

@injectable()
export default class MediaController {
    public readonly mediaService: MediaService;

    constructor(@inject(Identifier.MediaService) mediaService: MediaService) {
        this.mediaService = mediaService;
    }

    upload = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const file : Express.Multer.File | undefined  = req.file;
            const path = await this.mediaService.uploadFile(file);
            res.status(200).json(path);
        }
        catch (e : any) {
            next(e)
        }
    }

    getAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const medias = await this.mediaService.getMedias();
            res.status(200).json({ "medias" : medias });
        }
        catch (e : any) {
            next(e)
        }
    }

    deleteFile = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const request : pathDto = req.body;
            await this.mediaService.deleteFile(request.path);
            res.status(200).json({ "message" : "File deleted" });
        }
        catch (e : any) {
            next(e)
        }
    }
}