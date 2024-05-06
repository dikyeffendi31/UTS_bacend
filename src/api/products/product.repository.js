const { Product } = require('../../models');

/**
 * Get list of products
 * @returns {Promise}
 */
async function getProducts() {
  return Product.find({});
}

/**
 * Get product detail
 * @param {string} id - Product ID
 * @returns {Promise}
 */
async function getProduct(id) {
  return Product.findById(id);
}

/**
 * Create new product
 * @param {object} productData - Product data
 * @returns {Promise}
 */
async function createProduct(productData) {
  return Product.create(productData);
}

/**
 * Update existing product
 * @param {string} id - Product ID
 * @param {object} productData - Product data
 * @returns {Promise}
 */
async function updateProduct(id, productData) {
  return Product.findByIdAndUpdate(id, productData, { new: true });
}

/**
 * Delete a product
 * @param {string} id - Product ID
 * @returns {Promise}
 */
async function deleteProduct(id) {
  return Product.findByIdAndDelete(id);
}

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
