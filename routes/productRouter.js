import express from 'express';
import { productController } from '../controllers';

const router = express.Router();

router.get('/:style_code', productController.productDetail);

export default router;
