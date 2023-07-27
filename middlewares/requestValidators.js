const { celebrate, Joi } = require('celebrate');
const { urlRegex } = require('../utils/constants');

const userIdValidator = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24),
    required: true,
  }),
});

const userProfileUpdateValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

const userLoginValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const userSignUpValidator = celebrate({
  body: Joi.object()
    .keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
      name: Joi.string().min(2).max(30),
    })
    .unknown(true),
});

const movieBodyValidator = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(urlRegex),
    trailerLink: Joi.string().required().pattern(urlRegex),
    thumbnail: Joi.string().required().pattern(urlRegex),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const movieIdValidator = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().hex().length(24).required(),
  }),
});

module.exports = {
  userIdValidator,
  userProfileUpdateValidator,
  userLoginValidator,
  userSignUpValidator,
  movieBodyValidator,
  movieIdValidator,
};
