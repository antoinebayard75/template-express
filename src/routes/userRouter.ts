import express from 'express';
import {UserController} from "../controller/userController";
import {Identifier} from "../config/identifier";
import {Config} from "../config/config";

const router = express.Router();

const userController = Config.getContainer().get<UserController>(Identifier.UserController);

router.get('', userController.getAllUsers);
router.get('/:id', userController.getUser);
router.post('', userController.addUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

export default router;