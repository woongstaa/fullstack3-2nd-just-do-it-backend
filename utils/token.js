import { sign, verify } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const signToken = id => {
  return sign({ id }, process.env.salt, { expiresIn: '60m' });
};

const verifyToken = token => {
  try {
    return verify(token, salt);
  } catch (err) {
    return null;
  }
};

export default { signToken, verifyToken };
