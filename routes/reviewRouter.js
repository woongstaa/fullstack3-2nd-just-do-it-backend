import express from 'express';
import { reviewController } from '../controllers';
import auth from '../middleware/authorization';
const router = express.Router();

router.post('/', auth.authentication, reviewController.postReview);
router.get('/', reviewController.getReview);
router.get('/reviewAverage', reviewController.getReviewAverage);
router.post('/reviewAverage', reviewController.getReviewAverage);

export default router;
