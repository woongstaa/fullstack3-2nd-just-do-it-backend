import express from 'express';
import { productDetailController } from '../controllers';
import { productListController } from '../controllers';

const router = express.Router();

router.get('/detail/:style_code', productDetailController.productDetail);
router.get('/list', productListController.productList);

export default router;
