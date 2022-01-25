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
        size,
        is_winner
      )
    VALUES(
      ${style_code},
      ${user_id},
      ${size},
      false
    );
  `;
};

const checkUserLottoBox = async (user_id, style_code) => {
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

const checkUserWinnerBox = async style_code => {
  return await prisma.$queryRaw`
    SELECT EXISTS(
      SELECT
        style_code,
        user_id
      FROM
        snkrs_winners
      WHERE
        style_code = ${style_code}
    ) as result;
    `;
};

const getNumOfParticipants = async style_code => {
  return await prisma.$queryRaw`
    SELECT
      style_code,
      user_id
    FROM
      snkrs_data
    WHERE
      style_code = ${style_code};
  `;
};

const getCount = async style_code => {
  return await prisma.$queryRaw`
    SELECT
      MAX(count)
    FROM  
      snkrs_winners
    WHERE
      snkrs_winners.style_code = ${style_code};
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

const addWinnerBox = async (style_code, user_id, size, is_winner, count) => {
  return await prisma.$queryRaw`
    INSERT INTO
      snkrs_winners(
        style_code,
        user_id,
        size,
        is_winner,
        count
      )
    VALUES(
      ${style_code},
      ${user_id},
      ${size},
      ${is_winner},
      ${count}
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

const updateWinner = async (style_code, user_id) => {
  return await prisma.$queryRaw`
    UPDATE
      snkrs_winners
    SET
      is_winner = true
    WHERE
      style_code = ${style_code} AND user_id = ${user_id}
    ORDER BY
      create_at DESC
    LIMIT
      1;
  `;
};

const updateCount = async (style_code, count, currentPeople) => {
  return await prisma.$queryRaw`
    UPDATE
      snkrs_winners
    SET
      count = ${count}
    WHERE
      style_code = ${style_code}
    ORDER BY
      create_at DESC
    LIMIT
      ${currentPeople}
  `;
};

const getWinnerList = async (user_id, style_code) => {
  return await prisma.$queryRaw`
    SELECT
      style_code,
      users.name,
      users.email,
      size,
      is_winner,
      count,
      create_at
    FROM
      snkrs_winners
    JOIN
      users ON user_id = users.id
    WHERE
      user_id = ${user_id}
    AND
      style_code = ${style_code};
  `;
};

export default {
  updataOpenClose,
  addLottoBox,
  checkUserLottoBox,
  checkUserWinnerBox,
  selectWinner,
  addWinnerBox,
  deleteLottoBox,
  updateWinner,
  updateCount,
  getNumOfParticipants,
  getWinnerList,
  getCount,
};

// insert into users(email,password,name,phone,is_member)
// values
// ("clzlsqkq@naver.com","1234","이준혁","01023232332",true),
// ("qqqqwwweer@naver.com","1234","김영욱","01023232332",true),
// ("123123123@naver.com","1234","이진웅","01023232332",true),
// ("123123123@naver.com","1234","황희윤","01023232332",true),
// ("asddafjob@naver.com","1234","장종현","0101247128",true);
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
