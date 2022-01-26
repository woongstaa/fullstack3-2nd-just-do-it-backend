import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const productFilter = async (genderId, categoryId, sortMethod) => {
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
      
      ORDER BY
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

export default { productFilter, getSizes };
