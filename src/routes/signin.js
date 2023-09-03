const router = require('express').Router();
const { loginValidation } = require('../user/validation/validation');
const { login } = require('../user/controller/userController');

router.post('/signin', loginValidation, login);

module.exports = router;
