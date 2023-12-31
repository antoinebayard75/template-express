import express from 'express';
import userRouter from "./routes/userRouter";
import authRouter from "./routes/authRouter";

const router = express.Router();

router.use('/user', userRouter);
router.use('/auth', authRouter);

export default router;