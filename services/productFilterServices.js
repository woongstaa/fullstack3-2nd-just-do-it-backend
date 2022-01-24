import { productFilterDao } from '../models';

const productFilter = async (genderId, categoryId, colorId, sizeId) => {
  const list = await productFilterDao.productFilter(genderId, categoryId);
  if (!list) {
    const error = new Error('LIST NOT FOUND');
    error.statusCode = 400;
    throw error;
  }
  let colorSyntax = `x.color_id===${colorId[0]}`;
  for (let i = 1; i < colorId.length; i++) {
    colorSyntax += `||x.color_id===${colorId[i]}`;
  }
  let newList = list.filter(x => x.color_id === 4 || x.color_id === 13);
  console.log('컬러신텍스:', colorSyntax);
  console.log(newList);
  return list;
};

export default { productFilter };
