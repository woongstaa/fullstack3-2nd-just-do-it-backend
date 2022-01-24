import { snkrsServices } from '../services';

const lottoBox = async (req, res) => {
  try {
    const { user_id, style_code, size } = req.body;

    const data = await snkrsServices.lottoBox(user_id, style_code, size);

    res.status(200).send({ message: '성공', data });
  } catch (err) {
    res.status(500).send({ message: '실패', err: err.message });
  }
};

const getWinnerList = async (req, res) => {
  try {
    const { user_id, style_code } = req.body;

    const data = await snkrsServices.getWinnerList(user_id, style_code);

    res.status(200).send({ message: '성공', data });
  } catch (err) {
    res.status(500).send({ message: '실패', err: err.message });
  }
};

export default { lottoBox, getWinnerList };
