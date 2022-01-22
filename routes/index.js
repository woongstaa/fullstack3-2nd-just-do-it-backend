import express from 'express';
import productRouter from './productRouter';
import userRouter from './userRouter';
import snkrsRouter from './snkrsRouter';

const router = express.Router();

router.use('/product', productRouter);
router.use('/user', userRouter);
router.use('/snkrs', snkrsRouter);

export default router;
