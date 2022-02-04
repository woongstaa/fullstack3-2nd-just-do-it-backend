import { cartServices } from '../services';
import { RequiredKeys } from '../utils/err';

const createCart = async (req, res) => {
  try {
    const { style_code, user_id, size, quantity } = req.body;
    const REQUIRED_KEYS = { style_code, user_id, size, quantity };

    const keys = new RequiredKeys(REQUIRED_KEYS);
    keys.verify();

    const result = await cartServices.createCart(
      style_code,
      user_id,
      size,
      quantity
    );

    res.status(201).send({ message: '성공', result });
  } catch (err) {
    res.status(err.status || 500).send({ message: '실패', err: err.message });
  }
};

const listCart = async (req, res) => {
  try {
    const { user_id } = req.body;

    const REQUIRED_KEYS = { user_id };

    const keys = new RequiredKeys(REQUIRED_KEYS);
    keys.verify();

    const result = await cartServices.cartList(user_id);

    res.status(200).send({ message: '성공', result });
  } catch (err) {
    res.status(err.status || 500).send({ message: '실패', err: err.message });
  }
};

const updateCart = async (req, res) => {
  try {
    const { user_id, cart_id, size, quantity } = req.body;

    const REQUIRED_KEYS = {
      user_id,
      cart_id,
      size,
      quantity,
    };

    const keys = new RequiredKeys(REQUIRED_KEYS);
    keys.verify();

    if (quantity > 10) {
      const err = new Error('10개이상 살 수 없습니다.');
      err.status = 400;
      throw err;
    }

    const result = await cartServices.updateCart(
      user_id,
      cart_id,
      size,
      quantity
    );

    res.status(201).send({ message: '성공', result });
  } catch (err) {
    res.status(err.status || 500).send({ message: '실패', err: err.message });
  }
};

const deleteCart = async (req, res) => {
  try {
    const { cart_id, user_id } = req.body;

    const result = await cartServices.deleteCart(cart_id, user_id);

    res.status(204).send({ message: '성공', result });
  } catch (err) {
    res.status(err.status || 500).send({ message: '실패', err: err.message });
  }
};

const updateQunantityItem = async (req, res) => {
  try {
    const { cart_id, user_id } = req.body;

    const REQUIRED_KEYS = { user_id, cart_id };

    const keys = new RequiredKeys(REQUIRED_KEYS);
    keys.verify();

    await cartServices.updateQunantityItem(cart_id);

    res.status(201).send({ message: '성공' });
  } catch (err) {
    res.status(err.status || 500).send({ message: '실패', err: err.message });
  }
};

export default {
  createCart,
  listCart,
  updateCart,
  deleteCart,
  updateQunantityItem,
};
