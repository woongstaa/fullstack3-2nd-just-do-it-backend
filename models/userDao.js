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
    GROUP BY
      style_code;
    WHERE
      user_id=${userId} and style_code=${styleCode};
  `;

  return review;
};

export default { postReview, getReview, getReviewAverage };
