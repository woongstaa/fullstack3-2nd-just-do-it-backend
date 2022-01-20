import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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
      sub_accessories.name as acc_type
    FROM
      products
    JOIN
      categories ON category_id = categories.id
    JOIN
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

const getProductImg = async style_code => {
  return await prisma.$queryRaw`
    SELECT
      product_img_urls.name,
      is_main
    FROM
      product_img_urls
    JOIN
      products ON products.style_code = product_img_urls.style_code
    WHERE
      product_img_urls.style_code = ${style_code};
  `;
};

const getProductSize = async style_code => {
  return await prisma.$queryRaw`
    SELECT 
      product_sizes.name as size,
      product_with_sizes.quantity
    FROM
      product_with_sizes
    JOIN
      products ON products.style_code = product_with_sizes.style_code
    JOIN
      product_sizes ON product_size_id = product_sizes.id
    WHERE
      product_with_sizes.style_code = ${style_code};
  `;
};

export default { getProductData, getProductImg, getProductSize };
