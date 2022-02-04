import { snkrsDao } from '../models';
import { statusType, resultType } from '../type';
import { IsExistItem } from '../utils/err';

const createUsersToLottoBox = async (user_id, style_code, size) => {
  const [snkrs] = await snkrsDao.getSnkrsData(style_code);
  const [checkStyleCode] = await snkrsDao.isExistStyleCode(style_code);
  const [checkSize] = await snkrsDao.isExistSizes(style_code, size);

  const isExistStyleCode = new IsExistItem(checkStyleCode, resultType, 409);
  isExistStyleCode.notExistErr('유효하지 않는 styleCode 입니다.');
  const isExistSize = new IsExistItem(checkSize, resultType, 409);
  isExistSize.notExistErr('유효하지 않는 size 입니다.');

  if (snkrs.is_open === statusType.OPEN) {
    const [check] = await snkrsDao.checkUserLottoBox(user_id, style_code);

    const isExistItem = new IsExistItem(check, resultType, 409);
    isExistItem.existErr('이미 추첨을 하셨습니다.');

    await snkrsDao.addLottoBox(user_id, style_code, size);
    await snkrsDao.addWinnerBox(user_id, style_code, size);

    return;
  } else if (snkrs.is_open === statusType.CLOSE) {
    const err = new Error('추첨기간이 아닙니다');
    err.status = 409;
    throw err;
  }
};

const selectWinner = async style_code => {
  const [check] = await snkrsDao.checkUserWinnerBox(style_code);
  const [count] = await snkrsDao.getCount(style_code);
  const participants = await snkrsDao.getNumOfParticipants(style_code);

  if (check.result === resultType.EXIST) {
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
  const [checkStyleCode] = await snkrsDao.isExistStyleCode(style_code);
  const isExistStyleCode = new IsExistItem(checkStyleCode, resultType, 409);
  isExistStyleCode.notExistErr('유효하지 않는 styleCode 입니다.');

  return snkrsDao.getWinnerList(user_id, style_code);
};

const snkrsList = async () => {
  const list = await snkrsDao.getSnkrsList();

  if (!list) {
    const error = new Error('LIST NOT FOUND');
    error.statusCode = 400;
    throw error;
  }
  return list;
};

const snkrsDetail = async style_code => {
  const [checkStyleCode] = await snkrsDao.isExistStyleCode(style_code);
  const isExistStyleCode = new IsExistItem(checkStyleCode, resultType, 409);
  isExistStyleCode.notExistErr('유효하지 않는 styleCode 입니다.');
  const [snkrsData] = await snkrsDao.getSnkrsData(style_code);
  return snkrsData;
};

export default {
  createUsersToLottoBox,
  selectWinner,
  getWinnerList,
  snkrsList,
  snkrsDetail,
};
