import { productDao } from '../models';

const productDetail = async style_code => {
  const [productData] = await productDao.getProductData(style_code);
  return productData;
};

const productList = async (
  genderId,
  categoryId,
  colorId,
  sizeName,
  subBrandName,
  subIconName,
  subClothesName,
  subAccessoriesName,
  sortMethod,
  search
) => {
  const arrayChange = filterValue => {
    if (filterValue) {
      if (typeof filterValue === 'string') {
        return `(${filterValue})`; // ("ACG")
      } else return '(' + filterValue.join() + ')'; // ("ACG", "NIKE lAB")
    } else return filterValue;
  };
  const arrayColorIdChange = filterValue => {
    if (filterValue) {
      if (typeof filterValue === 'string') {
        return `(${Number(filterValue)})`;
      } else return '(' + filterValue.join() + ')'; // WHERE color_id in (1,2,3)
    } else return filterValue;
  };

  let isSearch = false;

  if (search) isSearch = true;

  let list = await productDao.getProductList(
    genderId,
    categoryId,
    arrayColorIdChange(colorId),
    arrayChange(subBrandName),
    arrayChange(subIconName),
    arrayChange(subClothesName),
    arrayChange(subAccessoriesName),
    sortMethod,
    search,
    isSearch
  );

  if (list) {
    for (let i = 0; i < list.length; i++) {
      let sizeObject = await productDao.getSizes(list[i].styleCode);
      let sizeArr = sizeObject.map(e => e.size);
      list[i].sizes = sizeArr;
    }

    if (sizeName) {
      let sizeSyntax = ``;
      if (typeof sizeName === 'string') {
        sizeSyntax = `x.sizes.indexOf(${sizeName})!==-1`;
      } else {
        for (let i = 0; i < sizeName.length; i++) {
          if (i === 0) {
            sizeSyntax += `x.sizes.indexOf(${sizeName[i]})!==-1`;
          } else {
            sizeSyntax += `||x.sizes.indexOf(${sizeName[i]})!==-1`;
          }
        }
      }
      list = list.filter(x => eval(sizeSyntax));
    }
  }
  return list;
};

export default { productDetail, productList };
