const router = require('express').Router();


router.post('/', createMovie);
router.get('/', getAllMovies);
router.delete('/:movieId', deleteMovieById);
