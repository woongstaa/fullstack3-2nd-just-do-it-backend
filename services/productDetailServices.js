import { productDetailDao } from '../models';

const productDetail = async style_code => {
  const [productData] = await productDetailDao.getProductData(style_code);
  const productImg = await productDetailDao.getProductImg(style_code);
  const productSize = await productDetailDao.getProductSize(style_code);

  productData.img = productImg;
  productData.info = productSize;

  return productData;
};

export default { productDetail };
