import express from 'express';
import userRouter from "./routes/userRouter";
import authRouter from "./routes/authRouter";
import uploadRouter from "./routes/mediaRouter";
import authMiddleware from "./middlewares/authMiddleware";

const router = express.Router();

router.use('/media', authMiddleware, uploadRouter)
router.use('/user', userRouter);
router.use('/auth', authRouter);


export default router;