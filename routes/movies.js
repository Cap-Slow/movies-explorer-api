const movieRoutes = require('express').Router();
const {
  getSavedMovies,
  createMovie,
  deleteMovieById,
} = require('../controllers/movies');

movieRoutes.get('', getSavedMovies);
movieRoutes.post('', createMovie);
movieRoutes.delete('/:_id', deleteMovieById);

module.exports = movieRoutes;
