import { userServices } from '../services';

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
    console.log(REQUIRED_KEYS);
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
    const { userId, styleCode, color, size, comfort, width } = req.body;
    const review = await userServices.getReview(
      userId,
      styleCode,
      color,
      size,
      comfort,
      width
    );

    return res.status(200).json({ message: 'THIS_IS_REVIEW', review });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const getReviewAverage = async (req, res) => {
  try {
    const { userId, styleCode } = req.body;
    const review = await userServices.getReview(userId, styleCode);

    return res.status(200).json({ message: 'THIS_IS_REVIEW_AVERAGE', review });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};
export default { postReview, getReview, getReviewAverage };
