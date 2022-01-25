import express from 'express';
import { cartControllers } from '../controllers';
import auth from '../middleware/authorization';

const router = express.Router();

router.post('/', auth.memberProductBuying, cartControllers.createCart);
router.get('/:user_id', cartControllers.listCart);
router.put('/', cartControllers.updateCart);
router.delete('/', cartControllers.deleteCart);

export default router;
