const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UNAUTHORIZED_ERROR = require('../../error/UnauthorizedError');
const BAD_REQUEST_ERROR = require('../../error/BadRequestError');
const { NODE_ENV, JWT_SECRET } = require('../../utils/config');
const NOT_FOUND_ERROR = require('../../error/NotFoundError');
const CONFLICT_ERROR = require('../../error/ConflictError');
const { PASSWORD_REGEX } = require('../../utils/regex');
const User = require('../model/user');

function login(req, res, next) {
  const { email, password } = req.body;

  if (!PASSWORD_REGEX.test(password)) throw new BAD_REQUEST_ERROR('Пароль не соответствует регексу');

  User
    .findUserByCredentials(email, password)
    .then(({ _id }) => {
      if (_id) {
        const token = jwt.sign(
          { _id },
          NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
          { expiresIn: '3d' },
        );
        return res.send({ token });
      }
      throw new UNAUTHORIZED_ERROR('401: неверная электронная почта или пароль');
    })
    .catch(next);
}

function createUser(req, res, next) {
  const { email, password, name } = req.body;

  if (!PASSWORD_REGEX.test(password)) throw new BAD_REQUEST_ERROR('Пароль не соответствует регексу');

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    }))
    .then(() => res.status(201).send({ message: 'Пользователь зарегистрирован' }))
    .catch((err) => {
      if (err.code === 11000) next(new CONFLICT_ERROR('Пользователь уже существует'));
      else if (err.name === 'ValidationError') next(new BAD_REQUEST_ERROR('Неккоректные данные'));
      else next(err);
    });
}

function getUserInfo(req, res, next) {
  const { _id } = req.user;

  User
    .findById(_id)
    .then((user) => {
      if (user) return res.send(user);
      throw new NOT_FOUND_ERROR('Пользователь не найден');
    })
    .catch((err) => {
      if (err.name === 'CastError') next(new BAD_REQUEST_ERROR('Некорректный ID'));
      else next(err);
    });
}

function updateUserInfo(req, res, next) {
  const { email, name } = req.body;
  const { _id } = req.user;

  User
    .findByIdAndUpdate(
      _id,
      {
        email,
        name,
      },
      {
        new: true,
        runValidators: true,
      },
    )
    .then((user) => {
      if (user) return res.send(user);
      throw new NOT_FOUND_ERROR('Пользователь не найден');
    })
    .catch((err) => {
      if (err.code === 11000) return next(new CONFLICT_ERROR('Пользователь уже существует'));
      if (err.name === 'CastError') return next(new BAD_REQUEST_ERROR('Некорректный ID'));
      if (err.name === 'ValidationError') return next(new BAD_REQUEST_ERROR('Некорректные данные'));

      return next(err);
    });
}

module.exports = {
  updateUserInfo,
  getUserInfo,
  createUser,
  login,
};
