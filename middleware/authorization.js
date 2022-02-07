import { verify } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { userDao } from '../models';
import { IsExistItem, RequiredKeys } from '../utils/err';
import { resultType } from '../type';

dotenv.config();

const authentication = async (req, res, next) => {
// const userAuthentication
  try {
    const token = req.hearder.token;
    if (!token) {
      const err = new Error('LOGIN_REQUIRED');
      err.status = 401;
      throw err;
    }
    const validToken = verifyToken(token);

    if (validToken) {
      const [check] = await userDao.isExistUser(validToken.id[0].id);
      const isExsitUser = new IsExistItem(check, resultType, 404);

      isExsitUser.notExistErr('존재하지 않는 UserId 입니다.');
      req.userId = validToken.id[0].id;
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
// const memberAuthentication
  try {
    const { user_id, is_member_product } = req.body;
    const REQUIRED_KEYS = { user_id, is_member_product };

    const keys = new RequiredKeys(REQUIRED_KEYS);
    keys.verify();

    const isUserAuthorization = await userDao.isAuthorization(user_id);
    if (is_member_product === 1 && !isUserAuthorization) {
      const err = new Error('멤버 등록이 되지 않은 멤버입니다.');
      err.status = 403;
      throw err;
    } else {
      next();
    }
    // memberProduct 구매 vs product 구매 가 별도로 분리
    // memberProduct 구 매 -> memberAuthentication 붙고
    // "userAuthentication의 역할을 흡수시킬 수 있도록"
    // product 구매 -> userAuthentication 붙음.
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
