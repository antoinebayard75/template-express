import express from 'express';
import {AuthController} from "../controller/authController";
import {Identifier} from "../config/identifier";
import {Config} from "../config/config";

const router = express.Router();

const authController = Config.getContainer().get<AuthController>(Identifier.AuthController);

router.post('/login', authController.login);
router.post('/token', authController.tokenInfo);


export default router;