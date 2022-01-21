import express from 'express';
import { snkrsController } from '../controllers';

const router = express.Router();

router.post('/', snkrsController.lottoBox);
router.get('/', snkrsController.getWinnerList);

export default router;
