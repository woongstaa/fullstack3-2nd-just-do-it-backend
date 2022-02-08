import express from 'express';
import { cartControllers } from '../controllers';
import auth from '../middleware/authorization';

const router = express.Router();

router.post('/', auth.userAuthentication, cartControllers.createCart);
router.post('/member', auth.memberAuthentication, cartControllers.createCart);
router.get('/', auth.userAuthentication, cartControllers.listCart);
router.put('/', auth.userAuthentication, cartControllers.updateCart);
router.delete('/', auth.userAuthentication, cartControllers.deleteCart);
router.put(
  '/quantity',
  auth.userAuthentication,
  cartControllers.updateQunantityItem
);

export default router;
