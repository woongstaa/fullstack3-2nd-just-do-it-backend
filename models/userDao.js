import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const postReview = async (userId, styleCode, color, size, comfort, width) => {
  const review = await prisma.$queryRaw`
    INSERT INTO 
      product_reviews (user_id, style_code, color, size, comfort, width) 
    VALUES 
      (${userId}, ${styleCode}, ${color}, ${size}, ${comfort}, ${width});
  `;
  return '리뷰가 작성되었습니다.';
};

const getReview = async (userId, styleCode, color, size, comfort, width) => {
  const [review] = await prisma.$queryRaw`
    SELECT 
      user_id, style_code, color, size, comfort, width
    FROM 
      product_reviews
    WHERE
      user_id=${userId} and style_code=${styleCode};
  `;

  return review;
};

const getReviewAverage = async (userId, styleCode) => {
  const [review] = await prisma.$queryRaw`
    SELECT 
      style_code,
      avg(color) as colorAverage,
      avg(size) as sizeAverage,
      avg(comfort) as comfortAverage,
      avg(width) as widthAverage,
      (avg(color)+avg(size)+avg(comfort)+avg(width))/4 as totalAverage
    FROM 
      product_reviews
    WHERE
      style_code=${styleCode};
    GROUP BY
      style_code;
  `;

  return review;
};

const memberAuthorization = async userId => {
  const member = await prisma.$queryRaw`
    UPDATE
      users
    SET
      is_member=1
    WHERE
      id=${userId};
  `;

  return '멤버쉽 가입이 완료되었습니다.';
};

const isAuthorization = async userId => {
  const [member] = await prisma.$queryRaw`
    SELECT
      id
    FROM
      users
    WHERE
      id=${userId} and is_member=1;
  `;

  return member;
};

export default {
  postReview,
  getReview,
  getReviewAverage,
  memberAuthorization,
  isAuthorization,
};
