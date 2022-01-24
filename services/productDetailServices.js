import { productDetailDao } from '../models';
import { styleCodeType } from '../type';

const productDetail = async style_code => {
  if (style_code[0] === styleCodeType.snkrs) {
    const [snkrsData] = await productDetailDao.getSnkrsData(style_code);
    const snkrsImg = await productDetailDao.getSnkrsImg(style_code);
    const snkrsSize = await productDetailDao.getSnkrsSize(style_code);

    snkrsData.img = snkrsImg;
    snkrsData.info = snkrsSize;

    return snkrsData;
  } else {
    const [productData] = await productDetailDao.getProductData(style_code);
    const productImg = await productDetailDao.getProductImg(style_code);
    const productSize = await productDetailDao.getProductSize(style_code);

    productData.img = productImg;
    productData.info = productSize;

    return productData;
  }
};

export default { productDetail };
