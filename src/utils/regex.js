const PASSWORD_REGEX = /^(?=.*[A-z])(?=.*\d)(?=.*[!@#$%^&*])(?=.{8,})/;
const EMAIL_REGEX = /.+@.+\..+/;

module.exports = {
  PASSWORD_REGEX,
  EMAIL_REGEX,
};
