const movieRoutes = require('express').Router();
const {
  getSavedMovies,
  createMovie,
  deleteMovieById,
} = require('../controllers/movies');
const {
  movieBodyValidator,
  movieIdValidator,
} = require('../middlewares/requestValidators');

movieRoutes.get('', getSavedMovies);
movieRoutes.post('', movieBodyValidator, createMovie);
movieRoutes.delete('/:_id', movieIdValidator, deleteMovieById);

module.exports = movieRoutes;
