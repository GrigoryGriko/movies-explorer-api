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
    password: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'Минимальная длинна пароля 2 символа',
        'string.max': 'Максимальная длинна пароля 30 символов',
        'any.required': 'Пароль должен быть заполнен',
      }),
    name: Joi.string().min(2).max(30)
      .messages({
        'string.min': 'Минимальная длинна поля name - 2',
        'string.max': 'Максимальная длинна поля name - 30',
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
    password: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'Минимальная длинна пароля 2 символа',
        'string.max': 'Максимальная длинна пароля 30 символов',
        'any.required': 'Пароль должен быть заполнен',
      }),
  },
});

const validateMovieBody = celebrate({
  body: {
    country: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'Минимальная длинна поля country - 2',
        'string.max': 'Максимальная длинна поля country - 30',
        'any.required': 'Поле country должно быть заполнено',
      }),
    director: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'Минимальная длинна поля director - 2',
        'string.max': 'Максимальная длинна поля director - 30',
        'any.required': 'Поле director должно быть заполнено',
      }),
    duration: Joi.number().required().min(2).max(900)
      .messages({
        'string.min': 'Минимальная длинна поля duration - 2',
        'string.max': 'Максимальная длинна поля duration - 30',
        'any.required': 'Поле duration должно быть заполнено',
      }),
    year: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'Минимальная длинна поля year - 2',
        'string.max': 'Максимальная длинна поля year - 30',
        'any.required': 'Поле year должно быть заполнено',
      }),
    description: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'Минимальная длинна поля description - 2',
        'string.max': 'Максимальная длинна поля description - 30',
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
        'string.min': 'Минимальная длинна поля movieId - 2',
        'string.max': 'Максимальная длинна поля movieId - 30',
        'any.required': 'Поле movieId должно быть заполнено',
      }),
    nameRU: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'Минимальная длинна поля nameRU - 2',
        'string.max': 'Максимальная длинна поля nameRU - 30',
        'any.required': 'Поле nameRU должно быть заполнено',
      }),
    nameEN: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'Минимальная длинна поля nameEN - 2',
        'string.max': 'Максимальная длинна поля nameEN - 30',
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
