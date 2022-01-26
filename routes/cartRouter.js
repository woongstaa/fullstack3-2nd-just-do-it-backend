import express from 'express';
import { cartControllers } from '../controllers';
import auth from '../middleware/authorization';

const router = express.Router();

router.post('/', auth.memberProductBuying, cartControllers.createCart);
router.post('/list', cartControllers.listCart);
router.put('/', cartControllers.updateCart);
router.delete('/', cartControllers.deleteCart);
router.put('/quantity', cartControllers.updateQunantityItem);

export default router;
