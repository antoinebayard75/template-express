import express from 'express';
import userRouter from "./routes/userRouter";
import authRouter from "./routes/authRouter";
import uploadRouter from "./routes/mediaRouter";

const router = express.Router();

router.use('/media', uploadRouter)
router.use('/user', userRouter);
router.use('/auth', authRouter);


export default router;