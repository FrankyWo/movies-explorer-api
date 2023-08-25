const router = require('express').Router();
const { loginValidation } = require('../middlewares/validate');
const { login } = require('../controllers/users');

router.post('/signin', loginValidation, login);

module.exports = router;
