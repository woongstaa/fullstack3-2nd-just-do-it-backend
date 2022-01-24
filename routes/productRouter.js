import express from 'express';
import {
  productDetailController,
  productFilterController,
} from '../controllers';
import { productListController } from '../controllers';

const router = express.Router();

router.get('/detail/:style_code', productDetailController.productDetail);
router.get('/list', productListController.productList);
router.get('/filter', productFilterController.productFilter);

export default router;
