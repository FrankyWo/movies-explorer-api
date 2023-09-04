const { AuthError } = require('../errors');
const { checkPassword } = require('./hash');

/**
 * @param {string} email
 * @param {string} password
 */
async function findUserByCredentials(email, password) {
  const user = await this.findOne({ email }).select('+password');
  if (!user) throw new AuthError('Неправильные почта или пароль');

  const isPasswordCorrect = await checkPassword(password, user.password);
  if (!isPasswordCorrect) throw new AuthError('Неправильные почта или пароль');

  return user;
}

module.exports = findUserByCredentials;
