import express from 'express';
import routes from './routes';
import cors from 'cors';
import cron from 'node-cron';
import { snkrsDao } from './models';
import { snkrsServices } from './services';
import { productListDao } from './models';

const app = express();
const PORT = 8000;

const lottoSchedule = async () => {
  const list = await productListDao.snkrsList();
  let isOpen = false;

  for (let i = 0; i < list.length; i++) {
    cron.schedule('00 09 * * *', async () => {
      isOpen = true;
      await snkrsDao.updataOpenClose(isOpen, list[i].style_code);
      console.log(`${list[i].style_code} 추첨 가능`);
    });

    cron.schedule('30 09 * * *', async () => {
      isOpen = false;
      await snkrsDao.updataOpenClose(isOpen, list[i].style_code);
      await snkrsServices.selectWinner(list[i].style_code);

      console.log(`${list[i].style_code} 추첨 불가능상태`);
    });
  }
};

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
