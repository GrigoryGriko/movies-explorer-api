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
      throw new NotFoundError('Фильмы не найдены');
    }
  } catch (err) {
    next(err);
  }
};

module.exports.createMovie = async (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  try {
    const movie = await Movie.create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      owner: req.user._id,
      movieId,
      nameRU,
      nameEN,
    });
    if (movie) {
      return res.status(CODE_CREATED).send(movie);
    }
    throw new NotFoundError('Фильмы не найдены');
  } catch (err) {
    if (err.name === 'ValidationError') return next(new CastError('Ошибка валидации'));
    return next(err);
  }
};

module.exports.deleteMovieById = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.movieId);
    if (movie) {
      if (req.user._id.toString() !== movie.owner.toString()) {
        throw new FordibbenError('Запрещено удалять чужой фильм');
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
    return next(err);
  }
};
