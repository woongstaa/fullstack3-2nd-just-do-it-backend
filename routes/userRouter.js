import express from 'express';
import { userController } from '../controllers';

const router = express.Router();

router.post('/review', userController.postReview);
router.get('/review', userController.getReview);
router.get('/reviewAverage', userController.getReviewAverage);

export default router;
