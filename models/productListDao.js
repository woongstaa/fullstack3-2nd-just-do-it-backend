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
        products.color_id,
        products.sub_brand_id,
        products.sub_icon_id,
        products.sub_clothes_id,
        products.sub_accessories_id
      FROM
        products
      JOIN
        product_genders ON products.gender_id=product_genders.id
      JOIN
        categories ON products.category_id=categories.id
      JOIN
        product_img_urls ON products.style_code=product_img_urls.style_code
      WHERE
        product_img_urls.is_main=1
      AND
      CASE
      WHEN ${genderId} and ${categoryId} THEN products.gender_id = ${genderId} and products.category_id = ${categoryId}
      WHEN ${genderId} and !${categoryId} THEN products.gender_id = ${genderId}
      WHEN !${genderId} and ${categoryId} THEN products.category_id = ${categoryId}
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
    JOIN 
      product_colors ON snkrs.color_id=product_colors.id
    WHERE
      snkrs_img_urls.is_main=1;
  `;
  return list;
};

export default { productList, snkrsList };
