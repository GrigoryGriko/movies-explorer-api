const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const CastError = require('../errors/CastError');
const ConflictingRequestError = require('../errors/ConflictingRequestError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const {
  CODE_OK,
  CODE_CREATED,
} = require('../constants/constants');

module.exports.getUserData = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      return res.status(CODE_OK).send(user);
    }
    throw new NotFoundError(`Пользователь с id '${req.user._id}' не найден`);
  } catch (err) {
    if (err.name === 'CastError') return next(new CastError('Невалидный ID'));
    return next(err);
  }
};

module.exports.updateProfile = async (req, res, next) => {
  const { email, name } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        email,
        name,
      },

      {
        new: true,
        runValidators: true,
      },
    );
    if (user) {
      return res.status(CODE_OK).send(user);
    }
    throw new NotFoundError(`Пользователь с id '${req.params.userId}' не найден`);
  } catch (err) {
    if (err.code === 11000) return next(new ConflictingRequestError('Данный email уже существует'));
    if (err.name === 'ValidationError' || err.name === 'CastError') return next(new CastError('Переданы некорректные данные при обновлении профиля'));
    return next(err);
  }
};

module.exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      throw new UnauthorizedError('Неправильные почта или пароль');
    } else {
      const matched = await bcrypt.compare(password, user.password);
      if (!matched) {
        throw new UnauthorizedError('Неправильные почта или пароль');
      } else {
        const token = jwt.sign(
          { _id: user._id },
          NODE_ENV === 'production' ? JWT_SECRET : 'pro-letter-crypto',
        );

        return res
          .cookie('jwt', token, {
            maxAge: 360000,
            httpOnly: true,
            sameSite: true,
          })
          .send(user.toJSON());
      }
    }
  } catch (err) {
    if (err.name === 'ValidationError') return next(new CastError('Переданы некорректные данные'));
    return next(err);
  }
};

module.exports.createUser = async (req, res, next) => {
  const {
    email,
    password,
    name,
  } = req.body;

  try {
    const hash = await bcrypt.hash(password, 12);
    if (hash) {
      let user = await User.create({
        email,
        password: hash,
        name,
      });

      if (user) {
        user = {
          email,
          name,
        };
        return res.status(CODE_CREATED).send(user);
      }
      throw new NotFoundError('Пользователь не найден');
    }
  } catch (err) {
    if (err.code === 11000) return next(new ConflictingRequestError('Данный email уже существует'));
    if (err.name === 'ValidationError') return next(new CastError(err));
    return next(err);
  }
};
