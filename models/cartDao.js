import { PrismaClient } from '@prisma/client';
import { createType, updateType, deleteType } from '../type';
import { AffectedRow } from '../utils/err';

const prisma = new PrismaClient();

const createCart = async (style_code, user_id, size, quantity) => {
  await prisma.$queryRaw`
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

  const [row] = await prisma.$queryRaw`
    SELECT ROW_COUNT() as result;
  `;

  const newRow = new AffectedRow(row, createType, 409);
  newRow.result();

  return;
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

const checkCartId = async cart_id => {
  return await prisma.$queryRaw`
    SELECT EXISTS(
      SELECT
        user_id
      FROM
        carts
      WHERE
        carts.id = ${cart_id}
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
  await prisma.$queryRaw`
    UPDATE
      carts
    SET
      quantity = ${quantity},
      size = ${size}
    WHERE
      id = ${cart_id}
  `;

  const [row] = await prisma.$queryRaw`
    SELECT ROW_COUNT() as result;
  `;

  const newRow = new AffectedRow(row, updateType, 409);
  newRow.result();

  return;
};

const updateQunantityItem = async cart_id => {
  await prisma.$queryRaw`
    UPDATE
      product_with_sizes
    SET
      quantity = quantity - (SELECT quantity FROM carts WHERE carts.id = ${cart_id})
    WHERE
      product_with_sizes.style_code = (SELECT style_code FROM carts WHERE carts.id = ${cart_id})
    AND
      product_size_id = (SELECT id FROM product_sizes WHERE name = (SELECT size FROM carts WHERE carts.id = ${cart_id}))
    AND
      (SELECT quantity FROM carts WHERE carts.id = ${cart_id}) <
      (SELECT quantity FROM (SELECT quantity FROM product_with_sizes WHERE style_code = (SELECT style_code FROM carts WHERE carts.id = ${cart_id}) AND
      product_size_id = (SELECT id FROM product_sizes WHERE name = (SELECT size FROM carts WHERE carts.id = ${cart_id}))) tmp);
  `;

  const [row] = await prisma.$queryRaw`
    SELECT ROW_COUNT() as result;
  `;

  const newRow = new AffectedRow(row, updateType, 409);
  newRow.result();

  return;
};

const deleteCart = async cart_id => {
  await prisma.$queryRaw`
    DELETE FROM
      carts
    WHERE
      id = ${cart_id};
  `;

  const [row] = await prisma.$queryRaw`
    SELECT ROW_COUNT() as result;
  `;

  const newRow = new AffectedRow(row, deleteType, 409);
  newRow.result();

  return;
};

const deleteAllCartByUser = async user_id => {
  const [checkCountOfCart] = await prisma.$queryRaw`
    select
      count(id) as count
    FROM
      carts
    WHERE
      user_id = ${user_id};
  `;

  await prisma.$queryRaw`
    DELETE FROM
      carts
    WHERE
      user_id = ${user_id}
    `;

  const [row] = await prisma.$queryRaw`
    SELECT ROW_COUNT() as result;
  `;

  const newRow = new AffectedRow(row, checkCountOfCart.count, 409);
  newRow.results();

  return;
};

export default {
  createCart,
  getCartList,
  updateCart,
  checkCart,
  deleteCart,
  deleteAllCartByUser,
  updateQunantityItem,
  checkCartId,
};
