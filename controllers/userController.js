import { userServices } from '../services';

const signIn = async (req, res) => {
  try {
    const { email, name } = req.body;
    const REQUIRED_KEYS = { email, name };

    for (let key in REQUIRED_KEYS) {
      if (!REQUIRED_KEYS[key]) {
        return res.status(400).json({ message: 'KEY_ERROR' });
      }
    }

    const token = await userServices.signIn(email, name);

    return res.status(200).json({ message: 'LOGIN_SUCCEES', token });
  } catch (err) {
    console.log('controller error: ', err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const postReview = async (req, res) => {
  try {
    const { userId, styleCode, color, size, comfort, width } = req.body;
    const review = await userServices.postReview(
      userId,
      styleCode,
      color,
      size,
      comfort,
      width
    );

    const REQUIRED_KEYS = { userId, styleCode, color, size, comfort, width };
    for (let key in REQUIRED_KEYS) {
      if (!REQUIRED_KEYS[key]) {
        return res
          .status(400)
          .json({ message: '모든 속성에 대해 리뷰를 입력해주세요.' });
      }
    }

    return res
      .status(200)
      .json({ message: 'REVIEW_POSTED', userId, styleCode });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const getReview = async (req, res) => {
  try {
    const { userId, styleCode } = req.body;
    const review = await userServices.getReview(userId, styleCode);

    return res.status(200).json({ message: 'THIS_IS_REVIEW', review });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const getReviewAverage = async (req, res) => {
  try {
    const { styleCode } = req.body;
    const review = await userServices.getReviewAverage(styleCode);

    return res.status(200).json({ message: 'THIS_IS_REVIEW_AVERAGE', review });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const memberAuthorization = async (req, res) => {
  try {
    const { email } = req.body;
    const member = await userServices.memberAuthorization(email);

    return res.status(200).json({ message: 'MEMBERSHIP_SUCCESS', member });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

export default {
  postReview,
  getReview,
  getReviewAverage,
  memberAuthorization,
  signIn,
};
