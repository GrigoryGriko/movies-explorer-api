/* eslint-disable consistent-return */
const Movie = require('../models/movie');
const NotFoundError = require('../errors/NotFoundError');
const CastError = require('../errors/CastError');
const FordibbenError = require('../errors/FordibbenError');
const {
  CODE_OK,
  CODE_CREATED,
} = require('../constants/constants');

module.exports.getAllMovies = async (req, res, next) => {
  try {
    const movie = await Movie.find({});
    if (movie) {
      res.send(movie);
    } else {
      throw new NotFoundError('Карточки не найдены');
    }
  } catch (err) {
    next(err);
  }
};

module.exports.createMovie = async (req, res, next) => {
  const { name, link } = req.body;

  try {
    const movie = await Movie.create({ name, link, owner: req.user._id });
    if (movie) {
      res.status(CODE_CREATED).send(movie);
    } else {
      throw new NotFoundError('Карточки не найдены');
    }
  } catch (err) {
    if (err.name === 'ValidationError') return next(new CastError('Ошибка валидации'));
    next(err);
  }
};

module.exports.deleteMovieById = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.movieId);
    if (movie) {
      if (req.user._id.toString() !== movie.owner.toString()) {
        throw new FordibbenError('Запрещено удалять чужую карточку');
      } else {
        return Movie.findByIdAndRemove(req.params.movieId)
          .then(
            res.status(CODE_OK).send(movie),
          );
      }
    } else {
      throw new NotFoundError(`Фильм с id '${req.params.movieId}' не найдена`);
    }
  } catch (err) {
    if (err.name === 'CastError') return next(new CastError('Невалидный ID'));
    next(err);
  }
};
