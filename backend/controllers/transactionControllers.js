const Product = require("../models/Product");
const Transaction = require("../models/Transcation");

const addTransaction = async (req, res) => {
  try {
    const { productId, quantity, type } = req.body;

    if (!productId || !quantity || !["IN", "OUT"].includes(type)) {
      return res.status(400).json({ error: "Invalid Transaction" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    if (type === "IN") {
      product.quantity += quantity;
    } else if (type === "OUT") {
      if (product.quantity < quantity) {
        return res.status(400).json({ error: "Not enough stock" });
      }
      product.quantity -= quantity;
    }

    await product.save();

    const transaction = new Transaction({ productId, quantity, type });
    await transaction.save();

    return res
      .status(201)
      .json({ message: "Transaction successful", transaction });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().populate("productId");
    return res.status(200).json(transactions);
  } catch (err) {
    return res.status(500).json({ error: "Server Error" });
  }
};

module.exports = { addTransaction, getAllTransactions };
