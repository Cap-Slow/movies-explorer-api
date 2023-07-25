const userRoutes = require('express').Router();
const auth = require('../middlewares/auth');
const {
  getUserInfo,
  decoratedUpdateProfile,
  login,
  createUser,
  signOut,
} = require('../controllers/users');

userRoutes.get('/users/me', auth, getUserInfo);
userRoutes.patch('/users/me', auth, decoratedUpdateProfile);
userRoutes.post('/signin', login);
userRoutes.post('/signup', createUser);
userRoutes.post('/signout', signOut);

module.exports = userRoutes;
