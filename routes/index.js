import express from 'express';
import productDetailRouter from './productDetailRouter';
import snkrsRouter from './snkrsRouter';
import cartRouter from './cartRouter';

const router = express.Router();

router.use('/product/detail', productDetailRouter);
router.use('/snkrs', snkrsRouter);
router.use('/cart', cartRouter);

export default router;
