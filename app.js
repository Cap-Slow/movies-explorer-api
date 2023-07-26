require('dotenv').config();
const helmet = require('helmet');
const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const limiter = require('./middlewares/rate-limiter');
const routes = require('./routes');
const handleErrors = require('./middlewares/handleErrors');
const { requestLogger, errorLogger } = require('./logger');

const { PORT = 4000, DATABASE_PATH } = process.env;
mongoose.connect(DATABASE_PATH || 'mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
});
const app = express();
app.use(
  cors({
    origin: ['http://localhost:3000', 'https://slammovies.nomoreparties.sbs'],
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(limiter);
app.use(requestLogger);
app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(handleErrors);
app.listen(PORT);
