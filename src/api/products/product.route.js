const express = require('express');
const authenticationMiddleware = require('../middlewares/authentication-middleware');
const celebrate = require('../../core/celebrate-wrappers');
const productControllers = require('./product.controller'); // Ubah sesuai dengan nama file dan path yang benar
const productValidator = require('./product.validator'); // Ubah sesuai dengan nama file dan path yang benar

const router = express.Router();

module.exports = (app) => {
  app.use('/products', router);

  // Get list of products
  router.get('/', authenticationMiddleware, productControllers.getProducts);

  // Create product
  router.post(
    '/',
    authenticationMiddleware,
    celebrate(productValidator.createProduct),
    productControllers.createProduct
  );

  // Get product detail
  router.get('/:id', authenticationMiddleware, productControllers.getProduct);

  // Update product
  router.put(
    '/:id',
    authenticationMiddleware,
    celebrate(productValidator.updateProduct),
    productControllers.updateProduct
  );

  // Delete product
  router.delete(
    '/:id',
    authenticationMiddleware,
    productControllers.deleteProduct
  );

  // Add other routes as needed
};
