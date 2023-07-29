require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const cors = require('cors');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes');
const { errorsHandler } = require('./errors/errorsHandler');

const limiter = require('./middlewares/limiterConfig'); // Подключение настроек лимитера из отдельного файла

const { PORT = 3000, DB_URL = 'mongodb://localhost:27017/bitfilmsdb' } = process.env;

const app = express();

app.use(requestLogger);

app.use(limiter);

app.use(helmet());

mongoose.connect(DB_URL, { useNewUrlParser: true })
  .then(() => console.log('Подключение к базе данных успешно'))
  .catch((err) => {
    console.log('Ошибка подключения к базе данных', err);
    process.exit(1);
  });

app.use(express.json());
app.use(cors());

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorsHandler);

app.listen(PORT, () => {
  console.log('Сервер запущен на порту 3000');
});
