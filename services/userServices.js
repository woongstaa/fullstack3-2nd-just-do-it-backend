import { userDao } from '../models';

const postReview = async (userId, styleCode, color, size, comfort, width) => {
  const review = await userDao.getReview(
    userId,
    styleCode,
    color,
    size,
    comfort,
    width
  );

  if (review) {
    const error = new Error('이미 작성한 리뷰가 존재합니다.');
    error.statusCode = 400;

    throw error;
  }

  return await userDao.postReview(
    userId,
    styleCode,
    color,
    size,
    comfort,
    width
  );
};

const getReview = async (userId, styleCode, color, size, comfort, width) => {
  const review = await userDao.getReview(
    userId,
    styleCode,
    color,
    size,
    comfort,
    width
  );

  if (!review) {
    const error = new Error('리뷰가 존재하지 않습니다.');
    error.statusCode = 400;

    throw error;
  }

  return review;
};

const getReviewAverage = async (userId, styleCode) => {
  const review = await userDao.getReviewAverage(userId, styleCode);

  if (!review) {
    const error = new Error('평균을 계산할 리뷰가 충분히 존재하지 않습니다.');
    error.statusCode = 400;

    throw error;
  }

  return review;
};

export default { postReview, getReview, getReviewAverage };
