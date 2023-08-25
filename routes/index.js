const router = require('express').Router();
const NOT_FOUND_ERROR = require('../error/NotFoundError');
const auth = require('../middlewares/auth');
const routeSignup = require('./signup');
const routeSignin = require('./signin');
const routeMovies = require('./movies');
const routeUsers = require('./users');

router.use('/', routeSignin);
router.use('/', routeSignup);
router.use(auth);
router.use('/movies', routeMovies);
router.use('/users', routeUsers);
router.use((req, res, next) => next(new NOT_FOUND_ERROR('Страница не найдена')));

module.exports = router;
