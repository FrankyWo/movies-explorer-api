require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const limiter = require('./utils/rateLimiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const errorHandler = require('./middlewares/errorHandlers');

const router = require('./routes/index');

const { PORT = 3000 } = process.env;
const app = express();

const { BD_NAME, NODE_ENV } = process.env;

mongoose.connect(
  `mongodb://localhost:27017/${NODE_ENV === 'production' ? BD_NAME : 'local'}`,
  {
    useNewUrlParser: true,
    family: 4,
  },
);

const corsOptions = {
  origin: [
    'https://frankywoo.movies.nomoredomains.sbs',
    'http://frankywoo.movies.nomoredomains.sbs',
    'http://localhost:3001',
    'http://localhost:3000',
  ],

  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

app.use(requestLogger);
app.use(limiter);
app.use(helmet());
app.disable('x-powered-by');

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.use(router);
app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log('Сервер работает');
});
