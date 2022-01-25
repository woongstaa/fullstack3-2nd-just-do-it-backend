import { snkrsServices } from '../services';

const getLottoBox = async (req, res) => {
  try {
    const { user_id, style_code, size } = req.body;

    const data = await snkrsServices.getLottoBox(user_id, style_code, size);

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

const snkrsList = async (req, res) => {
  try {
    const list = await snkrsServices.snkrsList();
    return res.status(200).json({ message: 'SnkrsList', list });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Load Fail' });
  }
};

const snkrsDetail = async (req, res) => {
  try {
    const { style_code } = req.params;

    const data = await snkrsServices.snkrsDetail(style_code);

    res.status(200).send({ message: '성공', data });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: '실패', err });
  }
};

export default { getLottoBox, getWinnerList, snkrsList, snkrsDetail };
