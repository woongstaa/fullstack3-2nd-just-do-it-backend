import { productListDao } from '../models';

const productList = async (genderId, categoryId) => {
  const list = await productListDao.productList(genderId, categoryId);

  if (!list) {
    const error = new Error('LIST NOT FOUND');
    error.statusCode = 400;
    throw error;
  }
  console.log('젠더아이디', genderId);
  return list;
};

const snkrsList = async () => {
  const list = await productListDao.snkrsList();

  if (!list) {
    const error = new Error('LIST NOT FOUND');
    error.statusCode = 400;
    throw error;
  }
  return list;
};

export default { productList, snkrsList };
