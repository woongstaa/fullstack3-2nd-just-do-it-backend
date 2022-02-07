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
    const { user_id, styleCode, color, size, comfort, width } = req.body;
    //user_id -> token에서 받아올 수 있도록.
    // user_id -> userId camel case로

    const REQUIRED_KEYS = { user_id, styleCode, color, size, comfort, width };
    for (let key in REQUIRED_KEYS) {
      if (!REQUIRED_KEYS[key]) {
        return res
          .status(400)
          .json({ message: 'KEY_ERROR: 모든 속성에 대해 리뷰를 입력해주세요.' });
      }
    }
     await userServices.postReview(
      user_id,
      styleCode,
      color,
      size,
      comfort,
      width
    );

    return res
      .status(201)
      .json({ message: 'REVIEW_POSTED', user_id, styleCode });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

// const getReview = async (req, res) => {
//   try {
//     const { user_id, styleCode } = req.body;
//     const review = await userServices.getReview(user_id, styleCode);

//     return res.status(200).json({ message: 'THIS_IS_REVIEW', review });
//   } catch (err) {
//     console.log(err);
//     return res.status(err.statusCode || 500).json({ message: err.message });
//   }
// };

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
  //const createMember
  try {
    const { user_id } = req.body;
    const member = await userServices.memberAuthorization(user_id);

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
