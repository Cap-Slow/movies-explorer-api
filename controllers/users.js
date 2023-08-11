const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../utils/errors/notFoundError');
const UnauthorizedError = require('../utils/errors/unauthorizedError');
const {
  OK_CODE,
  CREATED_CODE,
  NOT_FOUND_USERID,
  WRONG_CREDENTIALS_MESSAGE,
  LOG_OUT_MESSAGE,
} = require('../utils/constants');

const { JWT_SECRET } = process.env;

function getUserInfo(req, res, next) {
  const userId = req.user._id;
  return User.findById(userId)
    .select('-__v')
    .then((user) => {
      if (!user) {
        throw new NotFoundError(NOT_FOUND_USERID);
      }
      res.status(OK_CODE).send(user);
    })
    .catch(next);
}

function updateProfile(req) {
  const { name, email } = req.body;
  return User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    { new: true, runValidators: true },
  );
}

function updateDataDecorator(updateFunction) {
  return function handleErrors(req, res, next) {
    return updateFunction(req, res, next)
      .select('-__v')
      .then((user) => {
        if (!user) {
          throw new NotFoundError(NOT_FOUND_USERID);
        }
        res.status(OK_CODE).send(user);
      })
      .catch(next);
  };
}

const decoratedUpdateProfile = updateDataDecorator(updateProfile);

function login(req, res, next) {
  const { email, password } = req.body;
  let _id;
  User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError(WRONG_CREDENTIALS_MESSAGE);
      }
      _id = user._id;
      return bcrypt.compare(password, user.password).then((isPasswordMatch) => {
        if (!isPasswordMatch) {
          throw new UnauthorizedError(WRONG_CREDENTIALS_MESSAGE);
        }
        const token = jwt.sign({ _id }, JWT_SECRET || 'some-secret-key', {
          expiresIn: '7d',
        });
        const userWithoutVersion = user.toObject();
        delete userWithoutVersion.__v;
        delete userWithoutVersion.password;
        res
          .cookie('jwt', token, {
            maxAge: 3600000 * 24 * 7,
            httpOnly: true,
            sameSite: 'none',
            secure: true,
          })
          .status(OK_CODE)
          .send({ userWithoutVersion });
      });
    })
    .catch(next);
}

function createUser(req, res, next) {
  const { name, email } = req.body;
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }).then((user) => {
      const userWithoutVersion = user.toObject();
      delete userWithoutVersion.__v;
      delete userWithoutVersion.password;
      return res.status(CREATED_CODE).send(userWithoutVersion);
    }))
    .catch(next);
}

function signOut(req, res) {
  res.clearCookie('jwt').send({ message: LOG_OUT_MESSAGE });
}

module.exports = {
  getUserInfo,
  decoratedUpdateProfile,
  login,
  createUser,
  signOut,
};
