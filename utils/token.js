import { sign, verify } from 'jsonwebtoken';

const salt = 'SALTSALTSALT';

const signToken = id => {
  return sign({ id }, salt, { expiresIn: '60m' });
};

const verifyToken = token => {
  try {
    return verify(token, salt);
  } catch (err) {
    return null;
  }
};

export default { signToken, verifyToken };
