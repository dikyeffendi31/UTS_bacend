const joi = require('joi');

module.exports = {
  createProduct: {
    body: {
      name: joi.string().min(1).max(100).required().label('Product Name'),
      jumlah: joi.number().integer().min(0).required().label('Quantity'),
      harga: joi.number().min(0).required().label('Price'),
      deskripsi: joi.string().min(1).required().label('Description'),
    },
  },

  updateProduct: {
    body: {
      name: joi.string().min(1).max(100).required().label('Product Name'),
      jumlah: joi.number().integer().min(0).required().label('Quantity'),
      harga: joi.number().min(0).required().label('Price'),
      deskripsi: joi.string().min(1).required().label('Description'),
    },
  },
};
