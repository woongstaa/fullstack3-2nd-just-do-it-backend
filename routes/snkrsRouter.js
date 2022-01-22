import express from 'express';
import { snkrsController } from '../controllers';
import { productListController } from '../controllers';

const router = express.Router();

router.post('/', snkrsController.lottoBox);
router.get('/', snkrsController.getWinnerList);
router.get('/list', productListController.snkrsList);

export default router;
