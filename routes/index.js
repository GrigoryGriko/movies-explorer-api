const router = require('express').Router();
const cookieParser = require('cookie-parser');

const usersRouter = require('./usersRouter');
const moviesRouter = require('./moviesRouter');
const auth = require('../middlewares/auth');
