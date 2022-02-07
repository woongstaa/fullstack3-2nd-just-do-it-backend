import { productServices } from '../services';

const productDetail = async (req, res) => {
  try {
    const { style_code } = req.params;

    const data = await productServices.productDetail(style_code);

    res.status(200).send({ message: '성공', data });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: '실패', err });
  }
};

const productList = async (req, res) => {
  try {
    const {
      genderId,
      categoryId,
      colorId,
      sizeName,
      subBrandName,
      subIconName,
      subClothesName,
      subAccessoriesName,
      sortMethod,
      search,
    } = req.query;

    const list = await productServices.productList(
      genderId,
      categoryId,
      colorId,
      sizeName,
      subBrandName,
      subIconName,
      subClothesName,
      subAccessoriesName,
      +sortMethod,
      search
    );
    return res.status(200).json({ message: 'ProductFilterList', list });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Load Fail' });
  }
};

export default { productDetail, productList };
