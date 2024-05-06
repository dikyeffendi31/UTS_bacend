const express = require('express');
const rateLimit = require('express-rate-limit');

const authenticationControllers = require('./authentication-controller');
const authenticationValidators = require('./authentication-validator');
const celebrate = require('../../../core/celebrate-wrappers');

const route = express.Router();
const minute = 30; //menit
const second = 60; //detik
const milisecond = 1000; //milidetik
// Define rate limiter middleware
const loginTimeLimiter = rateLimit({
  windowMs: minute * second * milisecond, // = 30 menit
  max: 5, // Maksimum 5 percobaan dalam jangka waktu yang ditentukan
  message: {
    error: 'Forbidden',
    message: 'terlalu sering salah, cobalah lagi 30 menit kemudian.',
    status: 403,
  },
});

module.exports = (app) => {
  app.use('/authentication', route);

  route.post(
    '/login',
    loginTimeLimiter, // Terapkan rate limiter untuk endpoint login
    celebrate(authenticationValidators.login),
    authenticationControllers.login
  );
};
