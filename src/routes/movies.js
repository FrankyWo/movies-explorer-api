const router = require('express').Router();
const { createMovieValidation, deleteMovieValidation } = require('../movie/validation/validation');
const { getMovies, createMovie, deleteMovie } = require('../movie/controller/movieController');

router.delete('/:id', deleteMovieValidation, deleteMovie);
router.post('/', createMovieValidation, createMovie);
router.get('/', getMovies);

module.exports = router;
