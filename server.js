import express from 'express';
import routes from './routes';
import cors from 'cors';
import cron from 'node-cron';

const app = express();
const PORT = 8000;

cron.schedule('*/5 * * * * *', function () {
  let bool = false;
});

cron.schedule('*/10 * * * * *', function () {
  let bool = true;
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
