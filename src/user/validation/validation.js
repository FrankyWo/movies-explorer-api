const { Joi, celebrate } = require('celebrate');
const { EMAIL_REGEX, PASSWORD_REGEX } = require('../../utils/regex');

const createValidation = celebrate({
  body: Joi.object().keys({
    password: Joi.string().required().pattern(PASSWORD_REGEX),
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

const loginValidation = celebrate({
  body: Joi.object().keys({
    password: Joi.string().required().pattern(PASSWORD_REGEX),
    email: Joi.string().required().email(),
  }),
});

const updateUserInfoValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().pattern(EMAIL_REGEX),
  }),
});

module.exports = {
  updateUserInfoValidation,
  createValidation,
  loginValidation,
};
