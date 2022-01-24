import { snkrsDao } from '../models';
import { productDetailDao } from '../models';

const lottoBox = async (user_id, style_code, size) => {
  const [snkrs] = await productDetailDao.getSnkrsData(style_code);
  if (snkrs.is_open === 1) {
    const [getData] = await snkrsDao.existLottoBox(user_id, style_code);

    if (getData.result === 1) {
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
  const [getData] = await snkrsDao.existWinnerBox(style_code);
  const participants = await snkrsDao.getNumOfParticipants(style_code);
  const [count] = await snkrsDao.getCount(style_code);

  if (getData.result === 1) {
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

export default { lottoBox, selectWinner, getWinnerList };
