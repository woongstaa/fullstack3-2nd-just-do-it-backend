import { verify } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { userDao } from '../models';
import { IsExistItem } from '../utils/err';
import { resultType } from '../type';

dotenv.config();

const userAuthentication = async (req, res, next) => {
  try {
    const token = req.header('token');
    if (!token) {
      const err = new Error('로그인을 해주세요.');
      err.status = 401;
      throw err;
    }

    const validToken = verifyToken(token);

    if (validToken) {
      const [check] = await userDao.isExistUser(validToken.id[0].id);
      const isExsitUser = new IsExistItem(check, resultType, 404);
      isExsitUser.notExistErr('존재하지 않는 UserId 입니다.');
      req.user_id = validToken.id[0].id;
    } else {
      const err = new Error('토큰이 유효하지 않습니다.');
      err.status = 401;
      throw err;
    }
    next();
  } catch (err) {
    res.status(err.status || 500).send({ message: '실패', err: err.message });
  }
};

const memberAuthentication = async (req, res, next) => {
  try {
    const token = req.header('token');
    if (!token) {
      const err = new Error('로그인을 해주세요.');
      err.status = 401;
      throw err;
    }

    const validToken = verifyToken(token);

    if (validToken) {
      const [check] = await userDao.isExistUser(validToken.id[0].id);
      const isExsitUser = new IsExistItem(check, resultType, 404);
      isExsitUser.notExistErr('존재하지 않는 UserId 입니다.');
      req.user_id = validToken.id[0].id;
    } else {
      const err = new Error('토큰이 유효하지 않습니다.');
      err.status = 401;
      throw err;
    }

    const isUserAuthorization = await userDao.isAuthorization(req.user_id);
    if (!isUserAuthorization) {
      const err = new Error('멤버 등록이 되지 않은 멤버입니다.');
      err.status = 403;
      throw err;
    }

    next();
  } catch (err) {
    res.status(err.status || 500).send({ message: '실패', err: err.message });
  }
};

const verifyToken = token => {
  try {
    return verify(token, process.env.salt);
  } catch (err) {
    return null;
  }
};

export default { userAuthentication, memberAuthentication };
