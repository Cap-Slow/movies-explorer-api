const userRoutes = require('express').Router();
const auth = require('../middlewares/auth');
const {
  getUserInfo,
  decoratedUpdateProfile,
  login,
  createUser,
  signOut,
} = require('../controllers/users');
const {
  userIdValidator,
  userProfileUpdateValidator,
  userLoginValidator,
  userSignUpValidator,
} = require('../middlewares/requestValidators');

userRoutes.get('/users/me', auth, userIdValidator, getUserInfo);
userRoutes.patch('/users/me', auth, userProfileUpdateValidator, decoratedUpdateProfile);
userRoutes.post('/signin', userLoginValidator, login);
userRoutes.post('/signup', userSignUpValidator, createUser);
userRoutes.post('/signout', signOut);

module.exports = userRoutes;
