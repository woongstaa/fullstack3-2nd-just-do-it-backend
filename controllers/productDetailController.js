import { productDetailServices } from '../services';

const productDetail = async (req, res) => {
  try {
    const { style_code } = req.params;

    const data = await productDetailServices.productDetail(style_code);

    res.status(200).send({ message: '성공', data });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: '실패', err });
  }
};

export default { productDetail };
