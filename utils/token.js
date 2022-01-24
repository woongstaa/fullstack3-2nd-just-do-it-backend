import { sign, verify } from 'jsonwebtoken';

const salt = 'SALTSALTSALT';

const signToken = email => {
  return sign({ id: email }, salt, { expiresIn: '60m' });
};

const verifyToken = token => {
  try {
    return verify(token, salt);
  } catch (err) {
    return null;
  }
};

export default { signToken, verifyToken };
