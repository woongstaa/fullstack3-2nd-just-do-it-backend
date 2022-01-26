import { detailDao } from '../models';
import { productFilterDao } from '../models';
import { listDao } from '../models';

const productDetail = async style_code => {
  const [productData] = await detailDao.getProductData(style_code);
  return productData;
};

const productFilter = async (
  genderId,
  categoryId,
  colorId,
  sizeName,
  subBrandName,
  subIconName,
  subClothesName,
  subAccessoriesName,
  sortMethod
) => {
  let list = await productFilterDao.productFilter(
    genderId,
    categoryId,
    sortMethod
  );

  if (!list) {
    const error = new Error('LIST NOT FOUND');
    error.statusCode = 400;
    throw error;
  }

  for (let i = 0; i < list.length; i++) {
    let sizeObject = await productFilterDao.getSizes(list[i].styleCode);
    let sizeArr = sizeObject.map(e => e.size);
    list[i].sizes = sizeArr;
  }

  if (colorId) {
    let colorSyntax = ``;
    if (typeof colorId === 'string') {
      colorSyntax = `x.color_id===${Number(colorId)}`;
    } else {
      colorId = colorId.map(value => {
        return Number(value);
      });
      for (let i = 0; i < colorId.length; i++) {
        if (i === 0) {
          colorSyntax += `x.color_id===${colorId[0]}`;
        } else {
          colorSyntax += `||x.color_id===${colorId[i]}`;
        }
      }
    }
    list = list.filter(x => eval(colorSyntax));
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

  if (subBrandName) {
    let syntax = ``;
    if (typeof subBrandName === 'string') {
      syntax = `x.subBrandName===${subBrandName}`;
    } else {
      for (let i = 0; i < subBrandName.length; i++) {
        if (i === 0) {
          syntax += `x.subBrandName===${subBrandName[0]}`;
        } else {
          syntax += `||x.subBrandName===${subBrandName[i]}`;
        }
      }
    }
    list = list.filter(x => eval(syntax));
  }

  if (subIconName) {
    let syntax = ``;
    if (typeof subIconName === 'string') {
      syntax = `x.subIconName===${subIconName}`;
    } else {
      for (let i = 0; i < subIconName.length; i++) {
        if (i === 0) {
          syntax += `x.subIconName===${subIconName[0]}`;
        } else {
          syntax += `||x.subIconName===${subIconName[i]}`;
        }
      }
    }
    list = list.filter(x => eval(syntax));
  }

  if (subClothesName) {
    let syntax = ``;
    if (typeof subClothesName === 'string') {
      syntax = `x.subClothesName===${subClothesName}`;
    } else {
      for (let i = 0; i < subClothesName.length; i++) {
        if (i === 0) {
          syntax += `x.subClothesName===${subClothesName[0]}`;
        } else {
          syntax += `||x.subClothesName===${subClothesName[i]}`;
        }
      }
    }
    list = list.filter(x => eval(syntax));
  }

  if (subAccessoriesName) {
    let syntax = ``;
    if (typeof subAccessoriesName === 'string') {
      syntax = `x.subAccessoriesName===${subAccessoriesName}`;
    } else {
      for (let i = 0; i < subAccessoriesName.length; i++) {
        if (i === 0) {
          syntax += `x.subAccessoriesName===${subAccessoriesName[0]}`;
        } else {
          syntax += `||x.subAccessoriesName===${subAccessoriesName[i]}`;
        }
      }
    }
    list = list.filter(x => eval(syntax));
  }

  return list;
};

const productList = async (genderId, categoryId) => {
  const list = await listDao.productList(genderId, categoryId);

  if (!list) {
    const error = new Error('LIST NOT FOUND');
    error.statusCode = 400;
    throw error;
  }
  console.log('젠더아이디', genderId);
  return list;
};

export default { productDetail, productList, productFilter };
