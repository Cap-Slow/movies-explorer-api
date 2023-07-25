const userRoutes = require('express').Router();
const {
  getUserInfo,
  decoratedUpdateProfile,
  login,
} = require('../controllers/users');

userRoutes.get('/users/me', getUserInfo);
userRoutes.patch('/users/me', decoratedUpdateProfile);
userRoutes.post('/signin', login);

module.exports = userRoutes;
