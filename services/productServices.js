import { productDao } from '../models';

const productDetail = async style_code => {
  const [productData] = await productDao.getProductData(style_code);
  const productImg = await productDao.getProductImg(style_code);
  const productSize = await productDao.getProductSize(style_code);

  productData.img = productImg;
  productData.info = productSize;

  return productData;
};

export default { productDetail };
