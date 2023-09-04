const router = require('express').Router();
const { updateUserInfoValidation } = require('../user/validation/validation');
const { getUserInfo, updateUserInfo } = require('../user/controller/userController');

router.get('/me', getUserInfo);
router.patch('/me', updateUserInfoValidation, updateUserInfo);

module.exports = router;
