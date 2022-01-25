import express from 'express';
import { cartControllers } from '../controllers';

const router = express.Router();

router.post('/', cartControllers.createCart);
router.get('/:user_id', cartControllers.listCart);
router.put('/', cartControllers.updateCart);
router.delete('/', cartControllers.deleteCart);

export default router;
