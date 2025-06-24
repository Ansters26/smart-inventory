const Product = require('../models/Product');

const addProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    product
      ? res.status(200).json(product)
      : res.status(404).json({ error: "Not found" });
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};

const updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    updated
      ? res.status(200).json(updated)
      : res.status(404).json({ error: "Not found" });
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    deleted
      ? res.status(200).json({ message: "Deleted" })
      : res.status(404).json({ error: "Not found" });
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};

module.exports = {
  addProduct,
  getProduct,
  getAllProducts,
  updateProduct,
  deleteProduct
};
