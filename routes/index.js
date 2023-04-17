const router = require('express').Router();
const cookieParser = require('cookie-parser');

const usersRouter = require('./usersRouter');
const moviesRouter = require('./moviesRouter');
const auth = require('../middlewares/auth');
const {
  validateUserLogin,
  validateUserRegister,
} = require('../middlewares/validation');
const {
  login,
  createUser,
} = require('../controllers/usersController');

router.use(cookieParser());

router.post('/signin', validateUserLogin, login);
router.post('/signup', validateUserRegister, createUser);

router.use(auth);
router.use('/users', usersRouter);
router.use('/movies', moviesRouter);
router.get('/signout', (req, res) => {
  res.clearCookie('jwt').send({ message: 'Выход' });
});

module.exports = router;
