import express from 'express';
import { snkrsController } from '../controllers';

const router = express.Router();

router.post('/', snkrsController.lottoBox);

export default router;
