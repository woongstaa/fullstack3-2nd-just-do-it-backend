import { snkrsServices } from '../services';
import { RequiredKeys } from '../utils/err';

const createUsersToLottoBox = async (req, res) => {
  try {
    const { style_code, size } = req.body;
    const { user_id } = req;
    const REQUIRED_KEYS = { user_id, style_code, size };

    const keys = new RequiredKeys(REQUIRED_KEYS);
    keys.verify();

    await snkrsServices.createUsersToLottoBox(user_id, style_code, size);

    res.status(201).send({ message: '성공' });
  } catch (err) {
    res.status(err.status || 500).send({ message: '실패', err: err.message });
  }
};

const getWinnerList = async (req, res) => {
  try {
    const { style_code } = req.body;
    const { user_id } = req;

    const REQUIRED_KEYS = { user_id, style_code };

    const keys = new RequiredKeys(REQUIRED_KEYS);
    keys.verify();

    const data = await snkrsServices.getWinnerList(user_id, style_code);

    res.status(200).send({ message: '성공', data });
  } catch (err) {
    res.status(err.status || 500).send({ message: '실패', err: err.message });
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
    res.status(err.status || 500).send({ message: '실패', err: err.message });
  }
};

export default { createUsersToLottoBox, getWinnerList, snkrsList, snkrsDetail };
