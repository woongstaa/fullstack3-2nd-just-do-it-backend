import express from 'express';
import productDetailRouter from './productDetailRouter';

const router = express.Router();

router.use('/product/detail', productDetailRouter);

export default router;
