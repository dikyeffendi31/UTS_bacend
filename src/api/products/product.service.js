const productRepository = require('./product.repository');
const { errorResponder, errorTypes } = require('../../core/errors');

/**
 * Get list of products
 * @returns {Array}
 */
async function getProducts() {
  try {
    const products = await productRepository.getProducts();
    return products;
  } catch (error) {
    throw errorResponder(errorTypes.INTERNAL_SERVER_ERROR, error.message);
  }
}

/**
 * Get product detail
 * @param {string} id - Product ID
 * @returns {Object}
 */
async function getProduct(id) {
  try {
    const product = await productRepository.getProduct(id);

    if (!product) {
      throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Unknown product');
    }

    return product;
  } catch (error) {
    throw errorResponder(errorTypes.INTERNAL_SERVER_ERROR, error.message);
  }
}

/**
 * Create new product
 * @param {object} productData - Product data
 * @returns {Object}
 */
async function createProduct(productData) {
  try {
    const product = await productRepository.createProduct(productData);
    return product;
  } catch (error) {
    throw errorResponder(errorTypes.INTERNAL_SERVER_ERROR, error.message);
  }
}

/**
 * Update existing product
 * @param {string} id - Product ID
 * @param {object} productData - Product data
 * @returns {Object}
 */
async function updateProduct(id, productData) {
  try {
    const existingProduct = await productRepository.getProduct(id);

    if (!existingProduct) {
      throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Unknown product');
    }

    const updatedProduct = await productRepository.updateProduct(
      id,
      productData
    );
    return updatedProduct;
  } catch (error) {
    throw errorResponder(errorTypes.INTERNAL_SERVER_ERROR, error.message);
  }
}

/**
 * Delete product
 * @param {string} id - Product ID
 * @returns {boolean}
 */
async function deleteProduct(id) {
  try {
    const existingProduct = await productRepository.getProduct(id);

    if (!existingProduct) {
      throw errorResponder(errorTypes.UNPROCESSABLE_ENTITY, 'Unknown product');
    }

    await productRepository.deleteProduct(id);
    return true;
  } catch (error) {
    throw errorResponder(errorTypes.INTERNAL_SERVER_ERROR, error.message);
  }
}

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
