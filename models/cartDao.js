import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const createCart = async (style_code, user_id, size, quantity) => {
  return await prisma.$queryRaw`
    INSERT INTO
      carts(
        style_code,
        user_id,
        size,
        quantity
      )
    VALUES
      (
        ${style_code},
        ${user_id},
        ${size},
        ${quantity}
      );
  `;
};

const checkCart = async (style_code, user_id, size) => {
  return await prisma.$queryRaw`
    SELECT EXISTS(
      SELECT
        style_code,
        user_id,
        size
      FROM
        carts
      WHERE
        user_id = ${user_id}
      AND
        style_code = ${style_code}
      AND
        size = ${size}
    ) as result
  `;
};

const getCartList = async user_id => {
  return await prisma.$queryRaw`
    SELECT
      carts.id, 
      carts.style_code,
      carts.quantity,
      carts.size,
      products.name,
      products.normal_price,
      products.sale_rate,
      products.sale_price,
      product_img_urls.name as url
    FROM
      carts
    JOIN
      products ON products.style_code = carts.style_code
    JOIN
      product_img_urls ON product_img_urls.style_code = products.style_code
    WHERE
      carts.user_id = ${user_id}
    AND
      product_img_urls.is_main = 1;
  `;
};

const updateCart = async (cart_id, size, quantity) => {
  return await prisma.$queryRaw`
    UPDATE
      carts
    SET
      quantity = ${quantity},
      size = ${size}
    WHERE
      id = ${cart_id}
  `;
};

const deleteCart = async cart_id => {
  return prisma.$queryRaw`
    DELETE FROM
      carts
    WHERE
      id = ${cart_id}
  `;
};

const deleteAllCartByUser = async user_id => {
  return await prisma.$queryRaw`
    DELETE FROM
      carts
    WHERE
      user_id = ${user_id}
    `;
};

export default {
  createCart,
  getCartList,
  updateCart,
  checkCart,
  deleteCart,
  deleteAllCartByUser,
};