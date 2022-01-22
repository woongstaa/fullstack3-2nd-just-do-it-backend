import { cartDao } from '../models';

const createCart = async (style_code, user_id, size, quantity) => {
  const [existItem] = await cartDao.checkCart(style_code, user_id, size);

  if (existItem.result === 1) {
    return;
  }

  const result = await cartDao.insertCart(style_code, user_id, size, quantity);

  return result;
};

const cartList = async user_id => {
  const data = await cartDao.showCartList(user_id);

  return data;
};

const updateCart = async (
  style_code,
  user_id,
  currentSize,
  afterSize,
  quantity
) => {
  if (quantity > 10) {
    return;
  }

  await cartDao.updateCart(
    style_code,
    user_id,
    currentSize,
    afterSize,
    quantity
  );

  const data = await cartDao.showCartList(user_id);

  return data;
};

const deleteCart = async (style_code, user_id, size) => {
  if (style_code && user_id && size) {
    await cartDao.deleteCart(style_code, user_id, size);
    const result = await cartDao.showCartList(user_id);
    return result;
  } else {
    await cartDao.allDeleteCart(user_id);
    const result = await cartDao.showCartList(user_id);
    return result;
  }
};

export default { createCart, cartList, updateCart, deleteCart };
