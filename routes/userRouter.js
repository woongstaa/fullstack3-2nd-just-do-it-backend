import express from 'express';
import { userController } from '../controllers';

const router = express.Router();

router.post('/signin', userController.signIn);
router.post('/review', userController.postReview);
router.get('/review', userController.getReview);
router.get('/reviewAverage', userController.getReviewAverage);
router.post('/member', userController.memberAuthorization);

export default router;
