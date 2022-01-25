import { cartDao } from '../models';
import { resultType } from '../type';

const createCart = async (style_code, user_id, size, quantity) => {
  const [existItem] = await cartDao.checkCart(style_code, user_id, size);

  if (existItem.result === resultType.EXIST) {
    const err = new Error('이미 품목에 있습니다.');
    throw err;
  }

  await cartDao.createCart(style_code, user_id, size, quantity);
  const data = await cartDao.getCartList(user_id);

  return data;
};

const cartList = async user_id => {
  const data = await cartDao.getCartList(user_id);

  return data;
};

const updateCart = async (user_id, cart_id, size, quantity) => {
  if (quantity > 10) {
    const err = new Error('10개이상 살 수 없습니다.');
    throw err;
  }

  await cartDao.updateCart(cart_id, size, quantity);

  const data = await cartDao.getCartList(user_id);

  return data;
};

const deleteCart = async (cart_id, user_id) => {
  if (cart_id && user_id) {
    await cartDao.deleteCart(cart_id);
    const result = await cartDao.getCartList(user_id);
    return result;
  } else {
    await cartDao.deleteAllCartByUser(user_id);
    const result = await cartDao.getCartList(user_id);
    return result;
  }
};

export default { createCart, cartList, updateCart, deleteCart };
