import { productDetailDao } from '../models';
import { styleCodeType } from '../type';

const productDetail = async style_code => {
  if (style_code[0] === styleCodeType.snkrs) {
    const [snkrsData] = await productDetailDao.getSnkrsData(style_code);
    return snkrsData;
  } else {
    const [productData] = await productDetailDao.getProductData(style_code);
    return productData;
  }
};

export default { productDetail };
