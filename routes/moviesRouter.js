const router = require('express').Router();

const {
  createMovie,
  getAllMovies,
  deleteMovieById,
} = require('../controllers/moviesController');

router.post('/', createMovie);
router.get('/', getAllMovies);
router.delete('/:movieId', deleteMovieById);

module.exports = router;
