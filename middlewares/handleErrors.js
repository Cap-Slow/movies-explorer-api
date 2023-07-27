const {
  SERVER_ERR_CODE,
  SERVER_ERR_MESSAGE,
  CONFLICT_CODE,
  DB_CONFLICT_CODE,
  EXISTING_EMAIL_MESSAGE,
} = require('../utils/constants');

module.exports = (err, req, res, next) => {
  const { statusCode = SERVER_ERR_CODE, message = SERVER_ERR_MESSAGE } = err;
  if (err.code === DB_CONFLICT_CODE) {
    res.status(CONFLICT_CODE).send({ message: EXISTING_EMAIL_MESSAGE });
    return;
  }
  res.status(statusCode).send({
    message: statusCode === SERVER_ERR_CODE ? SERVER_ERR_MESSAGE : message,
  });
  next();
};
