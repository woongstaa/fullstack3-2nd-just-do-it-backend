import express from 'express';
import { userController } from '../controllers';

const router = express.Router();

const a = {
  b: 'w',
  a() {
    s: 's';
  },
};

router.post('/signup', userController.signUp);
router.post('/signin', userController.signIn);

export default router;
