import express from 'express';
import { productDetailController } from '../controllers';

const router = express.Router();

router.get('/:style_code', productDetailController.productDetail);

export default router;
