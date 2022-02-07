import { cartDao, productDao } from '../models';
import { resultType } from '../type';
import { IsExistItem } from '../utils/err';

const createCart = async (style_code, user_id, size, quantity) => {
  const [check] = await cartDao.checkCart(style_code, user_id, size);
  const [checkSize] = await productDao.isExistSizes(style_code, size);
  const [checkStyleCode] = await productDao.isExistStyleCode(style_code);

  const isExistStyleCode = new IsExistItem(checkStyleCode, resultType, 404);
  isExistStyleCode.notExistErr('유효하지 않는 styleCode 입니다.');

  const isExistSize = new IsExistItem(checkSize, resultType, 404);
  isExistSize.notExistErr('유효하지 않는 size 입니다.');

  const isExistItem = new IsExistItem(check, resultType, 409);
  isExistItem.existErr('이미 품목에 있습니다.');

  await cartDao.createCart(style_code, user_id, size, quantity);
  const data = await cartDao.getCartList(user_id);

  return data;
};

const cartList = async user_id => {
  const data = await cartDao.getCartList(user_id);

  return data;
};

const updateCart = async (user_id, cart_id, size, quantity) => {
  const [check] = await cartDao.checkCartId(cart_id);

  const isExistItem = new IsExistItem(check, resultType, 404);
  isExistItem.notExistErr('존재하지 않는 CartId 입니다.');

  await cartDao.updateCart(cart_id, size, quantity);
  const data = await cartDao.getCartList(user_id);

  return data;
};

const deleteCart = async (cart_id, user_id) => {
  if (cart_id && user_id) {
    const [check] = await cartDao.checkCartId(cart_id);
    const isExistItem = new IsExistItem(check, resultType, 404);
    isExistItem.notExistErr('존재하지 않는 CartId 입니다.');
    await cartDao.deleteCart(cart_id);
    const result = await cartDao.getCartList(user_id);
    return result;
  } else {
    await cartDao.deleteAllCartByUser(user_id);
    const result = await cartDao.getCartList(user_id);
    return result;
  }
};

const updateQunantityItem = async cart_id => {
  for (let i = 0; i < cart_id.length; i++) {
    const [check] = await cartDao.checkCartId(cart_id[i]);
    const isExistItem = new IsExistItem(check, resultType, 404);
    isExistItem.notExistErr('존재하지 않는 CartId 입니다.');
    await cartDao.updateQunantityItem(cart_id[i]);
  }

  return;
};

export default {
  createCart,
  cartList,
  updateCart,
  deleteCart,
  updateQunantityItem,
};
