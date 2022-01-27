import { PrismaClient, raw } from '@prisma/client';
const prisma = new PrismaClient();

const getProductList = async (
  genderId,
  categoryId,
  colorId,
  subBrandName,
  subIconName,
  subClothesName,
  subAccessoriesName,
  sortMethod,
  search,
  isSearch
) => {
  let filterQuery = ``;
  if (colorId) {
    filterQuery += ` AND products.color_id in ${colorId}`;
  }
  if (subBrandName) {
    filterQuery += ` AND sub_brand.name in ${subBrandName}`;
  }
  if (subIconName) {
    filterQuery += ` AND sub_icon.name in ${subIconName}`;
  }
  if (subClothesName) {
    filterQuery += ` AND sub_clothes.name in ${subClothesName}`;
  }
  if (subAccessoriesName) {
    filterQuery += ` AND sub_accessories.name in ${subAccessoriesName}`;
  }

  const list = await prisma.$queryRaw`
      SELECT
        product_genders.name as genderName,
        categories.name as categoryName,
        products.style_code as styleCode,
        products.name as productName,
        products.normal_price,
        products.sale_rate,
        products.sale_price,
        products.is_member,
        product_img_urls.name as imgUrl,
        product_colors.name as colorName,
        products.color_id,
        sub_brand.name as subBrandName,
        sub_icon.name as subIconName,
        sub_clothes.name as subClothesName,
        sub_accessories.name as subAccessoriesName
      FROM
        products
      JOIN
        product_genders ON products.gender_id=product_genders.id
      JOIN
        categories ON products.category_id=categories.id
      JOIN
        product_img_urls ON products.style_code=product_img_urls.style_code
      LEFT JOIN
        product_colors ON products.color_id=product_colors.id
      LEFT JOIN
        sub_icon ON products.sub_icon_id=sub_icon.id
      LEFT JOIN
        sub_brand ON products.sub_brand_id=sub_brand.id
      LEFT JOIN
        sub_clothes ON products.sub_clothes_id=sub_clothes.id
      LEFT JOIN
        sub_accessories ON products.sub_accessories_id=sub_accessories.id
      WHERE
        If(${isSearch},products.name like '%${raw(search)}%',TRUE)
      AND
        product_img_urls.is_main=1
      AND
        CASE
        WHEN ${genderId} and ${categoryId} THEN products.gender_id = ${genderId} and products.category_id = ${categoryId}
        WHEN ${genderId} THEN products.gender_id = ${genderId}
        WHEN ${categoryId} THEN products.category_id = ${categoryId}
        ELSE TRUE
        END
      ${raw(filterQuery)}
      ORDER BY
        case WHEN ${sortMethod} = null then products.create_at end ASC,
        case WHEN ${sortMethod} = 1 then products.create_at end ASC,
        case WHEN ${sortMethod} = 2 then products.review_counts end DESC,
        case WHEN ${sortMethod} = 3 then products.name end DESC,
        case WHEN ${sortMethod} = 4 then products.sale_rate end DESC,
        case WHEN ${sortMethod} = 5 then products.normal_price end ASC,
        case WHEN ${sortMethod} = 6 then products.normal_price end DESC;
  `;
  return list;
};

const getSizes = async styleCode => {
  const sizes = await prisma.$queryRaw`
    SELECT 
      product_sizes.name as size
    FROM
      product_with_sizes
    JOIN
      product_sizes ON product_with_sizes.product_size_id=product_sizes.id
    WHERE
      product_with_sizes.style_code=${styleCode};
  `;
  return sizes;
};

const getProductData = async style_code => {
  return await prisma.$queryRaw`
    SELECT
      products.style_code,
      products.name,
      categories.name as category,
      product_colors.name as color,
      product_colors.color_hex as hex,
      product_genders.name as gender,
      normal_price,
      sale_rate,
      sale_price,
      is_member,
      sub_icon.name as shoes_type,
      sub_brand.name as brand,
      sub_clothes.name as clothes_type,
      sub_accessories.name as acc_type,
      (
        SELECT JSON_ARRAYAGG(JSON_OBJECT('url', product_img_urls.name, 'is_main', is_main))
        FROM product_img_urls
        JOIN products ON products.style_code = product_img_urls.style_code
        WHERE product_img_urls.style_code = ${style_code}
      ) AS img,
      (
        SELECT JSON_ARRAYAGG(JSON_OBJECT('size', product_sizes.name, 'quantity', product_with_sizes.quantity))
        FROM product_with_sizes
        JOIN products ON products.style_code = product_with_sizes.style_code
        JOIN product_sizes ON product_size_id = product_sizes.id
        WHERE product_with_sizes.style_code = ${style_code}
      ) AS info
    FROM
      products
    JOIN
      categories ON category_id = categories.id
    LEFT JOIN
      product_colors ON color_id = product_colors.id
    JOIN
      product_genders ON gender_id = product_genders.id
    LEFT JOIN
      sub_icon ON sub_icon_id = sub_icon.id
    LEFT JOIN
      sub_brand ON sub_brand_id = sub_brand.id
    LEFT JOIN
      sub_clothes ON sub_clothes_id = sub_clothes.id
    LEFT JOIN
      sub_accessories ON sub_accessories_id = sub_accessories.id
    WHERE
      products.style_code = ${style_code};
  `;
};

export default { getProductList, getSizes, getProductData };
