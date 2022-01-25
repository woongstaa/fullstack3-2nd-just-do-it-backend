import { snkrsDao } from '../models';
import { detailDao } from '../models';
import { listDao } from '../models';
import { statusType, resultType } from '../type';

const getLottoBox = async (user_id, style_code, size) => {
  const [snkrs] = await productDetailDao.getSnkrsData(style_code);
  if (snkrs.is_open === statusType.OPEN) {
    const [getData] = await snkrsDao.checkUserLottoBox(user_id, style_code);

    if (getData.result === resultType.EXIST) {
      const err = new Error('이미 추첨하셨습니다.');
      throw err;
    }

    await snkrsDao.addLottoBox(user_id, style_code, size);
    await snkrsDao.addWinnerBox(style_code, user_id, size, false, 0);

    return;
  } else {
    const err = new Error('추첨기간이 아닙니다');
    throw err;
  }
};

const selectWinner = async style_code => {
  const [getData] = await snkrsDao.checkUserWinnerBox(style_code);
  const participants = await snkrsDao.getNumOfParticipants(style_code);
  const [count] = await snkrsDao.getCount(style_code);

  if (getData.result === resultType.EXIST) {
    const [winnerInfo] = await snkrsDao.selectWinner(style_code);

    await snkrsDao.updateCount(
      winnerInfo.style_code,
      count['MAX(count)'] + 1,
      participants.length
    );

    await snkrsDao.updateWinner(winnerInfo.style_code, winnerInfo.user_id);
    await snkrsDao.deleteLottoBox(style_code);

    return;
  } else {
    return;
  }
};

const getWinnerList = async (user_id, style_code) => {
  return snkrsDao.getWinnerList(user_id, style_code);
};

const snkrsList = async () => {
  const list = await listDao.snkrsList();

  if (!list) {
    const error = new Error('LIST NOT FOUND');
    error.statusCode = 400;
    throw error;
  }
  return list;
};

const snkrsDetail = async style_code => {
  const [snkrsData] = await detailDao.getSnkrsData(style_code);
  return snkrsData;
};

export default {
  getLottoBox,
  selectWinner,
  getWinnerList,
  snkrsList,
  snkrsDetail,
};
