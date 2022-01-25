import { verify } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { userDao } from '../models';

const authentication = (req, res, next) => {
  const token = req.body.user_id; // token가져오기
  const validToken = verifyToken(token);
  if (validToken) {
    req.body.user_id = validToken.id[0].id;
    next();
  } else {
    res.status(400).send('토큰이 유효하지 않습니다.');
    return;
  }
};

const memberProductBuying = async (req, res, next) => {
  const { user_id, is_member } = req.body;
  const isUserAuthorization = await userDao.isAuthorization(user_id); // token가져오기
  if (is_member && !isUserAuthorization) {
    res.status(400).send('멤버 등록이 되지 않은 멤버입니다');
    return;
  } else {
    next();
  }
};

// 토큰 확인 절차
const verifyToken = token => {
  try {
    return verify(token, 'SALTSALTSALT');
  } catch (err) {
    return null;
  }
};

export default { authentication, memberProductBuying };
