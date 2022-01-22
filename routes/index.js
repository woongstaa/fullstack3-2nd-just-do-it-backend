import express from 'express';
import productRouter from './productRouter';
import userRouter from './userRouter';
import snkrsRouter from './snkrsRouter';
import cartRouter from './cartRouter';

const router = express.Router();

router.use('/product', productRouter);
router.use('/user', userRouter);
router.use('/snkrs', snkrsRouter);
router.use('/cart', cartRouter);

export default router;
