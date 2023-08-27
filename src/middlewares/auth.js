const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../error/UnauthorizedError');
const { JWT_SECRET } = require('../utils/config');

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization.replace('Bearer ', '');
  let payload;

  if (!authorization || !authorization.startsWith('Bearer ')) return next(new UnauthorizedError('Необходимо авторизироваться'));

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new UnauthorizedError('Необходимо авторизироваться'));
  }
  req.user = payload;

  return next();
};

module.exports = auth;
