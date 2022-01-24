import express from 'express';
import { cartControllers } from '../controllers';

const router = express.Router();

router.post('/', cartControllers.createCart);
router.get('/', cartControllers.listCart);
router.put('/', cartControllers.updateCart);
router.delete('/', cartControllers.deleteCart);

export default router;
