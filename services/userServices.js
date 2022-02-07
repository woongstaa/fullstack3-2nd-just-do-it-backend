import { userDao } from '../models';
import token from '../utils/token';

const signIn = async (email, name) => {
  const isExist = await userDao.isExistEmail(email);
  let userId = await userDao.getUserId(email);
  if (isExist) {
    return token.signToken(userId);
  }
  await userDao.createUser(email, name);
  userId = await userDao.getUserId(email);
  const signToken = token.signToken(userId);
  return signToken;
};

const postReview = async (userId, styleCode, color, size, comfort, width) => {
  const review = await userDao.getReview(userId, styleCode);

  if (review) {
    const error = new Error('이미 작성한 리뷰가 존재합니다.');
    error.statusCode = 400;

    throw error;
  }
  await userDao.countPlus(styleCode);
  return await userDao.postReview(
    userId,
    styleCode,
    color,
    size,
    comfort,
    width
  );
};

const getReview = async (userId, styleCode) => {
  const review = await userDao.getReview(userId, styleCode);

  if (!review) {
    const error = new Error('리뷰가 존재하지 않습니다.');
    error.statusCode = 400;

    throw error;
  }

  return review;
};

const getReviewAverage = async styleCode => {
  const review = await userDao.getReviewAverage(styleCode);

  if (!review) {
    const error = new Error('평균을 계산할 리뷰가 충분히 존재하지 않습니다.');
    error.statusCode = 400;

    throw error;
  }

  return review;
};

const memberAuthorization = async userId => {
  // const upgradeUserIntoMemeber(userId)
  const authorization = await userDao.isAuthorization(userId);

  if (authorization) {
    const error = new Error('이미 Member 등급인 회원입니다.');
    error.statusCode = 400;
    throw error;
  }

  const member = await userDao.memberAuthorization(userId);
  // const member = await userDao.updateUserIntoMember(userId);
  return member;
};

export default {
  postReview,
  getReview,
  getReviewAverage,
  memberAuthorization,
  signIn,
};
