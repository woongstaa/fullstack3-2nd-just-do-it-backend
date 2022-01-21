import express from 'express';
import productDetailRouter from './productDetailRouter';
import snkrsRouter from './snkrsRouter';

const router = express.Router();

router.use('/product/detail', productDetailRouter);
router.use('/snkrs', snkrsRouter);

export default router;
