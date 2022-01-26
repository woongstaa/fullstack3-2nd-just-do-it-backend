import express from 'express';

import { productController } from '../controllers';

const router = express.Router();

router.get('/detail/:style_code', productController.productDetail);
router.get('/list', productController.productList);
router.get('/filter', productController.productFilter);

export default router;
