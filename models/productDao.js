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
    JOIN
      sub_icon ON sub_icon_id = sub_icon.id
    JOIN
      sub_brand ON sub_brand_id = sub_brand.id
    JOIN
      sub_clothes ON sub_clothes_id = sub_clothes.id
    JOIN
      sub_accessories ON sub_accessories_id = sub_accessories.id
    WHERE
      products.style_code = "AAA-0001";
  `;
};

export default { getProductData };
