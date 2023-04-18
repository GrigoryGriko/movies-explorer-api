const router = require('express').Router();

const {
  validateMovieBody,
  validateMovieId,
} = require('../middlewares/validation');

const {
  createMovie,
  getUserMovies,
  deleteMovieById,
} = require('../controllers/moviesController');

router.post('/', validateMovieBody, createMovie);
router.get('/', validateMovieBody, getUserMovies);
router.delete('/:movieId', validateMovieId, deleteMovieById);

module.exports = router;
