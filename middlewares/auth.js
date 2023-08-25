const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { JWT_SECRET } = require('../utils/config');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError('Необходимо авторизироваться'));
  }

  const token = authorization.replace('Bearer ', '');

  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return next(new UnauthorizedError('Необходимо авторизироваться'));
  }

  req.user = payload;
  return next();
};

module.exports = auth;
