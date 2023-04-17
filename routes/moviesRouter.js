const router = require('express').Router();

const {
  validateMovieBody,
  validateMovieId,
} = require('../middlewares/validation');

const {
  createMovie,
  getAllMovies,
  deleteMovieById,
} = require('../controllers/moviesController');

router.post('/', validateMovieBody, createMovie);
router.get('/', validateMovieBody, getAllMovies);
router.delete('/:movieId', validateMovieId, deleteMovieById);

module.exports = router;
