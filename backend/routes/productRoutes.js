const express = require('express');
const {
  addProduct,
  getProduct,
  getAllProducts,
  updateProduct,
  deleteProduct
} = require('../controllers/productControllers');

const router = express.Router();

router
  .post('/', addProduct)
  .get('/:id', getProduct)
  .get('/', getAllProducts)
  .put('/:id', updateProduct)
  .delete('/:id', deleteProduct);

module.exports = router;
