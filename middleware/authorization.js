import { verify } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { userDao } from '../models';
import { IsExistItem, RequiredKeys } from '../utils/err';
import { resultType } from '../type';

dotenv.config();

const authentication = async (req, res, next) => {
  try {
    const token = req.body.user_id;
    const validToken = verifyToken(token);

    if (validToken) {
      const [check] = await userDao.isExistUser(validToken.id[0].id);
      const isExsitUser = new IsExistItem(check, resultType, 404);
      isExsitUser.notExistErr('존재하지 않는 UserId 입니다.');
      req.body.user_id = validToken.id[0].id;
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

const memberProductBuying = async (req, res, next) => {
  try {
    const { user_id, is_member } = req.body;
    const REQUIRED_KEYS = { user_id, is_member };

    const keys = new RequiredKeys(REQUIRED_KEYS);
    keys.verify();

    const isUserAuthorization = await userDao.isAuthorization(user_id);
    if (is_member === 1 && !isUserAuthorization) {
      const err = new Error('멤버 등록이 되지 않은 멤버입니다.');
      err.status = 403;
      throw err;
    } else {
      next();
    }
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

export default { authentication, memberProductBuying };
