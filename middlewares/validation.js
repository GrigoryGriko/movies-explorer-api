const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
Joi.objectId = require('joi-objectid')(Joi);

const validateProfile = celebrate({
  body: {
    email: Joi.string().required().custom((value, helpers) => {
      if (validator.isEmail(value)) {
        return value;
      }
      return helpers.message('Невалидный email');
    })
      .messages({
        'any.required': 'Поле email должно быть заполнено',
      }),
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'Минимальная длинна поля name - 2',
        'string.max': 'Максимальная длинна поля name - 30',
        'any.required': 'Поле name должно быть заполнено',
      }),
  },
});

const validateUserRegister = celebrate({
  body: {
    email: Joi.string().required().custom((value, helpers) => {
      if (validator.isEmail(value)) {
        return value;
      }
      return helpers.message('Невалидный email');
    })
      .messages({
        'any.required': 'Поле email должно быть заполнено',
      }),
    password: Joi.string().required()
      .messages({
        'any.required': 'Пароль должен быть заполнен',
      }),
    name: Joi.string().min(2).max(30)
      .messages({
        'string.min': 'Минимальная длинна поля name - 2',
        'string.max': 'Максимальная длинна поля name - 30',
        'any.required': 'Поле name должно быть заполнено',
      }),
  },
});

const validateUserLogin = celebrate({
  body: {
    email: Joi.string().required().custom((value, helpers) => {
      if (validator.isEmail(value)) {
        return value;
      }
      return helpers.message('Невалидный email');
    })
      .messages({
        'any.required': 'Поле email должно быть заполнено',
      }),
    password: Joi.string().required()
      .messages({
        'any.required': 'Пароль должен быть заполнен',
      }),
  },
});

const validateMovieBody = celebrate({
  body: {
    country: Joi.string().required()
      .messages({
        'any.required': 'Поле country должно быть заполнено',
      }),
    director: Joi.string().required()
      .messages({
        'any.required': 'Поле director должно быть заполнено',
      }),
    duration: Joi.number().required()
      .messages({
        'any.required': 'Поле duration должно быть заполнено',
      }),
    year: Joi.string().required()
      .messages({
        'any.required': 'Поле year должно быть заполнено',
      }),
    description: Joi.string().required()
      .messages({
        'any.required': 'Поле description должно быть заполнено',
      }),
    image: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Невалидный url');
    })
      .messages({
        'any.required': 'Поле image должно быть заполнено',
      }),
    trailerLink: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Невалидный url');
    })
      .messages({
        'any.required': 'Поле trailerLink должно быть заполнено',
      }),
    thumbnail: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Невалидный url');
    })
      .messages({
        'any.required': 'Поле thumbnail должно быть заполнено',
      }),
    movieId: Joi.number().required()
      .messages({
        'any.required': 'Поле movieId должно быть заполнено',
      }),
    nameRU: Joi.string().required()
      .messages({
        'any.required': 'Поле nameRU должно быть заполнено',
      }),
    nameEN: Joi.string().required().min(2).max(30)
      .messages({
        'any.required': 'Поле nameEN должно быть заполнено',
      }),
  },
});

const validateMovieId = celebrate({
  params: {
    movieId: Joi.objectId().required()
      .messages({
        'any.required': 'Id фильма не указан',
      }),
  },
});

module.exports = {
  validateMovieId,
  validateMovieBody,
  validateUserRegister,
  validateUserLogin,
  validateProfile,
};
