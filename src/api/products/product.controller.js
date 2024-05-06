const productService = require('./product.service');
const { errorResponder, errorTypes } = require('../../core/errors');

/**
 * Handle get list of products request
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @param {object} next - Express route middleware
 * @returns {object} Response object or pass an error to the next route
 */
async function getProducts(req, res, next) {
  try {
    const products = await productService.getProducts();
    return res.status(200).json(products);
  } catch (error) {
    return next(error);
  }
}

/**
 * Handle get product detail request
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @param {object} next - Express route middleware
 * @returns {object} Response object or pass an error to the next route
 */
async function getProduct(req, res, next) {
  try {
    const product = await productService.getProduct(req.params.id);

    if (!product) {
      throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Unknown product');
    }

    return res.status(200).json(product);
  } catch (error) {
    return next(error);
  }
}

/**
 * Handle create product request
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @param {object} next - Express route middleware
 * @returns {object} Response object or pass an error to the next route
 */
async function createProduct(req, res, next) {
  try {
    const product = await productService.createProduct(req.body);
    return res.status(200).json(product);
  } catch (error) {
    return next(error);
  }
}

/**
 * Handle update product request
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @param {object} next - Express route middleware
 * @returns {object} Response object or pass an error to the next route
 */
async function updateProduct(req, res, next) {
  try {
    const { id } = req.params;
    const product = await productService.updateProduct(id, req.body);

    if (!product) {
      throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Unknown product');
    }

    return res.status(200).json(product);
  } catch (error) {
    return next(error);
  }
}

/**
 * Handle delete product request
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @param {object} next - Express route middleware
 * @returns {object} Response object or pass an error to the next route
 */
async function deleteProduct(req, res, next) {
  try {
    const { id } = req.params;
    const success = await productService.deleteProduct(id);

    if (!success) {
      throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Unknown product');
    }

    return res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
