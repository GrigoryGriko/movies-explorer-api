require('dotenv').config();
const express = require('express');

const helmet = require('helmet');
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');
const limiter = require('./middlewares/limiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const routes = require('./routes/index');
const errorHandler = require('./middlewares/errorHandler');

const { PORT = 3000, CONNECT_DB = 'mongodb://localhost:27017/bitfilmsdb' } = process.env;

const app = express();

app.use(helmet());

app.use(limiter);

/*app.use(cors({
  origin: '*',
  methods: 'GET,PUT,POST,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
}));*/

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(CONNECT_DB);

app.use(requestLogger);

app.use(routes);

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Сервер работает (порт: ${PORT})`);
});

module.exports = app;
