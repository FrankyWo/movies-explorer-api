const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('../configs');

/**
 * @typedef {(string | object | Buffer)} Payload
 */

/**
 * @param {Payload} payload
 * @returns {string} token
 */
const generateToken = (payload) => jwt.sign(payload, process.env.NODE_ENV === 'production' ? JWT_SECRET : 'secret', { expiresIn: '7d' });

/**
 * @param {string} token
 * @returns { Payload | Error} token payload or Error
 */
const verifyToken = (token) => jwt.verify(token, process.env.NODE_ENV === 'production' ? JWT_SECRET : 'secret');

module.exports = {
  generateToken,
  verifyToken,
};
