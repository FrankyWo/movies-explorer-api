require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const { BD_URL } = require('./configs');

const { PORT = 3000 } = process.env;

const limiter = require('./configs/limiter-config');
const router = require('./routes');
const {
  handleError, requestLogger, errorLogger, handleCors, handleCelebrateErrors,
} = require('./middlewares');

const app = express();

app.use(limiter);
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(requestLogger);
app.use(handleCors);
app.use(router);
app.use(errorLogger);

app.use(handleCelebrateErrors);
app.use(handleError);

async function start() {
  mongoose.set('strictQuery', false);
  try {
    await mongoose.connect(BD_URL);
    await app.listen(PORT);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }
}

start()
  // eslint-disable-next-line no-console
  .then(() => console.log(`App has been successfully started!\n${BD_URL}\nPort: ${PORT}`));
