import express from 'express';
import routes from './routes';
import cors from 'cors';
import cron from 'node-cron';
import { snkrsDao } from './models';
import { snkrsServices } from './services';

const app = express();
const PORT = 8000;
let count = 0;
let isOpen = false;

cron.schedule('*/1 * * * *', function () {
  isOpen = false;
  count += 0.5;
  snkrsDao.updataOpenClose(isOpen, 'DAA-0001');
  snkrsServices.selectWinner('DAA-0001', count);

  // console.log('추첨 불가능상태');
});

cron.schedule('*/2 * * * *', function () {
  isOpen = true;
  snkrsDao.updataOpenClose(isOpen, 'DAA-0001');
  // console.log('추첨 가능');
});

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
