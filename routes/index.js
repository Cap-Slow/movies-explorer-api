const routes = require('express').Router();
const auth = require('../middlewares/auth');
const userRoutes = require('./users');
const movieRoutes = require('./movies');
const NotFoundError = require('../utils/errors/notFoundError');
const { NONEXISTENT_URL_MESSAGE } = require('../utils/constants');

routes.use('', userRoutes);
routes.use('/movies', auth, movieRoutes);
routes.use('*', (req, res, next) => {
  next(new NotFoundError(NONEXISTENT_URL_MESSAGE));
});

module.exports = routes;
