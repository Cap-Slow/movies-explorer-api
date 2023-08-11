const urlRegex = /^(https?:\/\/)?([\w-]{1,32}\.[\w-]{1,32})[^\s@]*\/?$/i;
const OK_CODE = 200;
const CREATED_CODE = 201;
const UNAUTHORIZED_CODE = 401;
const FORBIDDEN_CODE = 403;
const NOT_FOUND_CODE = 404;
const CONFLICT_CODE = 409;
const DB_CONFLICT_CODE = 11000;
const SERVER_ERR_CODE = 500;
const SERVER_ERR_MESSAGE = 'На сервере произошла ошибка.';
const NOT_FOUND_USERID = 'Пользователь с указанным id не найден.';
const NOT_FOUND_MOVIEID = 'Фильм с указанным id не найден.';
const UNAUTHORIZED_MESSAGE = 'Нет доступа.';
const WRONG_CREDENTIALS_MESSAGE = 'Неправильные почта или пароль.';
const FORBIDDEN_MOVIE_DELETE_MESSAGE = 'Нельзя удалять чужие фильмы.';
const EXISTING_EMAIL_MESSAGE = 'Пользователь с таким email уже существует.';
const NONEXISTENT_URL_MESSAGE = 'Запрашиваемый ресурс не найден.';
const LOG_OUT_MESSAGE = 'Вы вышли из системы.';
module.exports = {
  urlRegex,
  OK_CODE,
  NOT_FOUND_USERID,
  CREATED_CODE,
  UNAUTHORIZED_CODE,
  FORBIDDEN_CODE,
  NOT_FOUND_CODE,
  CONFLICT_CODE,
  DB_CONFLICT_CODE,
  SERVER_ERR_CODE,
  SERVER_ERR_MESSAGE,
  NOT_FOUND_MOVIEID,
  UNAUTHORIZED_MESSAGE,
  WRONG_CREDENTIALS_MESSAGE,
  FORBIDDEN_MOVIE_DELETE_MESSAGE,
  EXISTING_EMAIL_MESSAGE,
  NONEXISTENT_URL_MESSAGE,
  LOG_OUT_MESSAGE,
};
