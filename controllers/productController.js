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

const productFilter = async (req, res) => {
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
    } = req.query;
    const list = await productServices.productFilter(
      genderId,
      categoryId,
      colorId,
      sizeName,
      subBrandName,
      subIconName,
      subClothesName,
      subAccessoriesName
    );
    return res.status(200).json({ message: 'ProductFilterList', list });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Load Fail' });
  }
};

const productList = async (req, res) => {
  try {
    const { genderId, categoryId } = req.query;
    console.log('젠더아이디', genderId);
    const list = await productServices.productList(genderId, categoryId);
    return res.status(200).json({ message: 'ProductList', list });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Load Fail' });
  }
};

export default { productDetail, productFilter, productList };
