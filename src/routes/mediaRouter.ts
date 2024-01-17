import express from 'express';
import multer from 'multer';
import Config from "../config/config";
import Identifier from "../config/identifier";
import MediaController from "../controller/mediaController";

const router = express.Router();
const upload = multer();

const mediaController : MediaController = Config.getContainer().get<MediaController>(Identifier.MediaController);

router.post('/', upload.single('file'), mediaController.upload);
router.get('/', mediaController.getAll);
router.delete('/', mediaController.deleteFile);

export default router;