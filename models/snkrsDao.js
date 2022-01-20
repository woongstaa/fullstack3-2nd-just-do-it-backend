import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const updataOpenClose = async (bool, style_code) => {
  return await prisma.$queryRaw`
    UPDATE
      snkrs
    SET
      is_open = ${bool}
    WHERE
      style_code = ${style_code}
  `;
};

const addLottoBox = async (user_id, style_code, size) => {
  return await prisma.$queryRaw`
    INSERT INTO
      snkrs_data(
        style_code,
        user_id,
        size 
      )
    VALUES(
      ${style_code},
      ${user_id},
      ${size}
    );
  `;
};

const getLottoBox = async (user_id, style_code) => {
  return await prisma.$queryRaw`
    SELECT EXISTS(
      SELECT
        style_code,
        user_id
      FROM
        snkrs_data
      WHERE
        user_id = ${user_id} AND style_code = ${style_code}
    ) as result
    `;
};

const getLottoBox2 = async style_code => {
  return await prisma.$queryRaw`
    SELECT EXISTS(
      SELECT
        style_code,
        user_id
      FROM
        snkrs_data
      WHERE
        style_code = ${style_code}
    ) as result;
    `;
};

const selectWinner = async style_code => {
  return await prisma.$queryRaw`
    SELECT
      style_code,
      user_id,
      size
    FROM
      snkrs_data
    WHERE
      style_code = ${style_code}
    ORDER BY
      rand()
    LIMIT
      1; 
  `;
};

const insertWinner = async (style_code, user_id, size) => {
  return await prisma.$queryRaw`
    INSERT INTO
      snkrs_winners(
        style_code,
        user_id,
        size
      )
    VALUES(
      ${style_code},
      ${user_id},
      ${size}
    );
  `;
};

const deleteLottoBox = async style_code => {
  return await prisma.$queryRaw`
    DELETE FROM
      snkrs_data
    WHERE
      style_code = ${style_code};
  `;
};

export default {
  updataOpenClose,
  addLottoBox,
  getLottoBox,
  getLottoBox2,
  selectWinner,
  insertWinner,
  deleteLottoBox,
};

// insert into users(email,password,name,phone,is_member)
// values
// ("clzlsqkq@naver.com","1234","이준혁","01023232332",true),
// ("qqqqwwweer@naver.com","1234","김영욱","01023232332",true),
// ("123123123@naver.com","1234","이진웅","01023232332",true),
// ("123123123@naver.com","1234","황희윤","01023232332",true);

// select * from snkrs_data order by RAND() limit 1;

// SELECT
// style_code,
// users.name,
// users.email,
// size
// FROM
// snkrs_data
// JOIN
// users ON user_id = users.id
// WHERE
// style_code = ${style_code}
// ORDER BY
// rand()
// LIMIT
// 1;
// `;
