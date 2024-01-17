import {injectable} from "inversify";
import SupportedMedia from "../../domain/media/supportedMedia";
import {randomUUID} from "crypto";
import MissingFileException from "../../domain/media/exceptions/missingFileException";
import NotSupportedFileExtensionException from "../../domain/media/exceptions/notSupportedFileExtensionException";
import TooLargeFileException from "../../domain/media/exceptions/tooLargeFileException";
import {existsSync, mkdirSync, readdirSync, rmSync, statSync, writeFileSync} from "fs";
import Global from "../../global";
import mediaResponse from "./mediaResponse";
import path from "path";
import FileNotFoundException from "../../domain/media/exceptions/fileNotFoundException";
import PathDto from "../../controller/dto/pathDto";

@injectable()
export default class MediaService {
    private readonly supportedMedia : SupportedMedia = new SupportedMedia()
    private readonly stockageFolder: string = Global.MEDIA_ABSOLUTE_PATH;
    private readonly appFolder: string = Global.DIRNAME;

    async uploadFile(file : Express.Multer.File | undefined) : Promise<mediaResponse> {
        this.validateFile(file);
        file = file as Express.Multer.File;
        const fileName = randomUUID();
        const monthAndYear = new Date().toISOString().slice(0, 7);
        const extension = file.mimetype.split('/')[1];
        const folderPath = `${this.stockageFolder}/${monthAndYear}`;
        if(!existsSync(folderPath))
            mkdirSync(folderPath)
        writeFileSync(`${folderPath}/${fileName}.${extension}`, file.buffer);
        const pathDto : PathDto = {path: `/${Global.MEDIA_FOLDER_NAME}/${monthAndYear}/${fileName}.${extension}`}
        return Promise.resolve(pathDto);
    }

    async getMedias() : Promise<mediaResponse[]> {
        const medias : mediaResponse[] = [];
        const breadcrumb : string = `/${Global.MEDIA_FOLDER_NAME}/`;

        const exploreFolder = async (folderPath : string, breadCrumb : string) => {
            const content = readdirSync(folderPath);
            for (const file of content) {
                const absolutePath = path.join(folderPath, file);
                const stat = statSync(absolutePath);
                if(stat.isDirectory())
                    await exploreFolder(absolutePath, `${breadCrumb}${file}/`);
                else
                    medias.push({path : `${breadCrumb}${file}`});
            }
        }
        await exploreFolder(this.stockageFolder, breadcrumb);
        return Promise.resolve(medias);
    }

    private validateFile(file : Express.Multer.File | undefined) {
        if (!file)
            throw new MissingFileException();

        if (!this.supportedMedia.supportFormat(file.mimetype))
            throw new NotSupportedFileExtensionException()

        if (!this.supportedMedia.supportSize(file.size))
            throw new TooLargeFileException()
    }

    async deleteFile(path: string) : Promise<void> {
        const absolutePath = `${this.appFolder}${path}`;
        if(!existsSync(absolutePath))
            throw new FileNotFoundException();
        await rmSync(absolutePath);
        return Promise.resolve();
    }
}