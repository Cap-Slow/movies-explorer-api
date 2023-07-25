require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const routes = require('./routes');
const { requestLogger, errorLogger } = require('./logger');

const { PORT = 3000, DATABASE_PATH } = process.env;
mongoose.connect(DATABASE_PATH || 'mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
});
const app = express();
app.use(
  cors({
    origin: ['http://localhost:3000'],
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);
app.use(routes);
app.use(errorLogger);
app.use(errors());
// app.use(handleErrors);
app.listen(PORT);
