const mongoose = require('mongoose');
const movieModel = require('../models/movie');
const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');
const ForbiddenError = require('../errors/ForbiddenError');
// const created = require('../utils/const');

const getMovies = (req, res, next) => {
  movieModel
    .find({ owner: req.user._id })
    .then((movies) => res.send(movies))
    .catch((err) => next(err));
};

const createMovie = (req, res, next) => {
  const {
    movieId,
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
  } = req.body;

  movieModel
    .create({
      movieId,
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      nameRU,
      nameEN,
      thumbnail,
      owner: req.user._id,
    })
    .then((movie) => {
      res.status(201).send(movie);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new ValidationError('Ошибка валидации'));
      } else {
        next(err);
      }
    });
};

const deleteMovie = (req, res, next) => {
  movieModel
    .findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        next(new NotFoundError('Фильм с указанным id не найден'));
      } else if (movie.owner.toString() !== req.user._id) {
        next(new ForbiddenError('Недостаточно прав для удаления'));
      } else {
        return movieModel.findByIdAndRemove(req.params.movieId)
          .then((m) => res.send(m));
      } return null;
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Ошибка валидации'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie,
};
