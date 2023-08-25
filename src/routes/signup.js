const router = require('express').Router();
const { createValidation } = require('../user/validation/validation');
const { createUser } = require('../user/controller/userController');

router.post('/signup', createValidation, createUser);

module.exports = router;
