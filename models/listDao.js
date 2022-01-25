import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const productList = async (genderId, categoryId) => {
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
        product_img_urls.is_main=1
      AND
      CASE
      WHEN ${genderId} and ${categoryId} THEN products.gender_id = ${genderId} and products.category_id = ${categoryId}
      WHEN ${genderId} THEN products.gender_id = ${genderId}
      WHEN ${categoryId} THEN products.category_id = ${categoryId}
      ELSE TRUE
      END
  `;
  return list;
};

const snkrsList = async () => {
  const list = await prisma.$queryRaw`
    SELECT
      categories.name as categoryName,
      snkrs.style_code,
      snkrs.name as snkrsName,
      snkrs.price,
      snkrs_img_urls.name as imgUrl,
      snkrs.color_id as colorId,
      product_colors.name as colorName,
      snkrs.is_open
    FROM
      snkrs
    JOIN
      categories ON snkrs.category_id=categories.id
    JOIN
      snkrs_img_urls ON snkrs.style_code=snkrs_img_urls.style_code
    LEFT JOIN 
      product_colors ON snkrs.color_id=product_colors.id
    WHERE
      snkrs_img_urls.is_main=1;
  `;
  return list;
};

export default { productList, snkrsList };
