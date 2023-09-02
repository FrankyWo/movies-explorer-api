const cors = require('cors');
const { errors } = require('celebrate');
const mongoose = require('mongoose');
const express = require('express');
const helmet = require('helmet');
const { requestLogger, errorLogger } = require('./src/middlewares/logger');
const limiter = require('./src/middlewares/rateLimiter');
const { MONGO_URL } = require('./src/utils/config');
const router = require('./src/routes/index');

const { PORT = 3000 } = process.env;

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());

app.use(requestLogger);
app.use(limiter);
app.use(router);
app.use(errorLogger);
app.use(errors());

app.use((error, request, response, next) => {
  const {
    status = 500,
    message,
  } = error;
  response.status(status)
    .send({
      message: status === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
});

async function start() {
  mongoose.set('strictQuery', false);
  try {
    await mongoose.connect(MONGO_URL);
    await app.listen(PORT);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }
}

start()
  // eslint-disable-next-line no-console
  .then(() => console.log(`App has been successfully started!\n${MONGO_URL}\nPort: ${PORT}`));
