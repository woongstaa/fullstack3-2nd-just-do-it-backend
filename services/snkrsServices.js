import { snkrsDao } from '../models';
import { productDetailDao } from '../models';

const lottoBox = async (user_id, style_code, size) => {
  const [snkrs] = await productDetailDao.getSnkrsData(style_code);
  if (snkrs.is_open === 1) {
    const [getData] = await snkrsDao.getLottoBox(user_id, style_code);

    if (getData.result === 1) {
      const err = new Error('이미 추첨하셨습니다.');
      throw err;
    }

    await snkrsDao.addLottoBox(user_id, style_code, size);

    return;
  } else {
    const err = new Error('추첨기간이 아닙니다');
    throw err;
  }
};

const selectWinner = async style_code => {
  const [getData] = await snkrsDao.getLottoBox2(style_code);

  if (getData.result === 1) {
    const [winnerInfo] = await snkrsDao.selectWinner(style_code);
    await snkrsDao.insertWinner(
      winnerInfo.style_code,
      winnerInfo.user_id,
      winnerInfo.size
    );
    await snkrsDao.deleteLottoBox(winnerInfo.style_code);
    console.log(winnerInfo);
    return;
  } else {
    return;
  }
};

export default { lottoBox, selectWinner };
