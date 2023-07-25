const Movie = require('../models/movie');
const {
  OK_CODE,
  CREATED_CODE,
  NOT_FOUND_MOVIEID,
  FORBIDDEN_MOVIE_DELETE_MESSAGE
} = require('../utils/constants');
const NotFoundError = require('../utils/errors/notFoundError');
const ForbiddenError = require('../utils/errors/forbiddenError');

function getSavedMovies(req, res, next) {
  const userId = req.user._id;
  return Movie.find({ owner: userId })
    .select('-__v')
    .then((movies) => res.send(movies))
    .catch(next);
}

function createMovie(req, res, next) {
  const userId = req.user._id;
  const {
    country, director, duration, year, description, image, trailerLink, thumbnail, movieId, nameRU,
    nameEN,
  } = req.body;
  return Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: userId,
  })
    .then((movie) => {
      const movieWithoutObject = movie.toObject();
      delete movieWithoutObject.__v;
      return res.status(CREATED_CODE).send(movieWithoutObject);
    })
    .catch(next);
}

function deleteMovieById(req, res, next) {
  const movieId = req.params._id;
  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(NOT_FOUND_MOVIEID);
      }
      if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError(FORBIDDEN_MOVIE_DELETE_MESSAGE);
      }
      return Movie.findByIdAndRemove(movieId);
    })
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(NOT_FOUND_MOVIEID);
      }
      res.status(OK_CODE).send({ message: 'Фильм удален' });
    })
    .catch(next);
}

module.exports = {
  getSavedMovies,
  createMovie,
  deleteMovieById,
};
