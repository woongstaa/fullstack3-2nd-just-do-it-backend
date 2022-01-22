import { cartServices } from '../services';

const createCart = async (req, res) => {
  try {
    const { style_code, user_id, size, quantity } = req.body;
    const REQUIRED_KEYS = { style_code, user_id, size, quantity };

    for (let key in REQUIRED_KEYS) {
      if (!REQUIRED_KEYS[key]) {
        return res.status(400).send({
          message: `카트 추가에 필요한 ${key} 정보가 올바르지 않습니다.`,
        });
      }
    }

    const result = await cartServices.createCart(
      style_code,
      user_id,
      size,
      quantity
    );

    res.status(200).send({ message: '성공', result });
  } catch (err) {
    console.log(err);
    res.status(err.StatusCode || 500).send({ message: '실패', err });
  }
};

const cartList = async (req, res) => {
  try {
    const { user_id } = req.body;

    const result = await cartServices.cartList(user_id);

    res.status(200).send({ message: '성공', result });
  } catch (err) {
    console.log(err);
    res.status(err.StatusCode || 500).send({ message: '실패', err });
  }
};

const updateCart = async (req, res) => {
  try {
    const { style_code, user_id, currentSize, afterSize, quantity } = req.body;

    const REQUIRED_KEYS = {
      style_code,
      user_id,
      currentSize,
      afterSize,
      quantity,
    };

    for (let key in REQUIRED_KEYS) {
      if (!REQUIRED_KEYS[key]) {
        return res.status(400).send({
          message: `상품 업데이트에 필요한 ${key} 정보가 올바르지 않습니다.`,
        });
      }
    }

    await cartServices.updateCart(
      style_code,
      user_id,
      currentSize,
      afterSize,
      quantity
    );
    const result = await cartServices.cartList(user_id);

    res.status(200).send({ message: '성공', result });
  } catch (err) {
    console.log(err);
    res.status(err.StatusCode || 500).send({ message: '실패', err });
  }
};

const deleteCart = async (req, res) => {
  try {
    const { style_code, user_id, size } = req.body;

    const result = await cartServices.deleteCart(style_code, user_id, size);

    res.status(200).send({ message: '성공', result });
  } catch (err) {
    console.log(err);
    res.status(err.StatusCode || 500).send({ message: '실패', err });
  }
};

export default { createCart, cartList, updateCart, deleteCart };
