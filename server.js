import express from 'express';
import routes from './routes';
import cors from 'cors';
import cron from 'node-cron';
import { snkrsDao } from './models';
import { snkrsServices } from './services';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

const lottoSchedule = async () => {
  const list = await snkrsDao.getSnkrsList();
  let isOpen = false;

  for (let i = 0; i < list.length; i++) {
    cron.schedule(`26 18 * * *`, async () => {
      isOpen = true;
      await snkrsDao.updataOpenClose(isOpen, list[i].style_code);
      console.log('시작');
    });

    cron.schedule(`${(i + 1) * 5} 38 18 * * *`, async () => {
      isOpen = false;
      await snkrsDao.updataOpenClose(isOpen, list[i].style_code);
      await snkrsServices.selectWinner(list[i].style_code);
      console.log('마감');
    });
  }
}; // lottoScheduler를 별도의 모듈로 분리하여 사용 -> server.js 만들 때와 마찬가지로 db 연결해주어야 함.

app.use(cors());
app.use(express.json());
app.use(routes);

const start = async () => {
  try {
    app.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
  } catch (err) {
    console.error(err);
    await prisma.$disconnect();
  }
};

start();
lottoSchedule();
