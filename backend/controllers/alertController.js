const Product = require("../models/Product");

const lowStockAlerts = async (req, res) => {
  try {
    const lowStockProducts = await Product.find({
      $expr: { $lte: ["$quantity", "$threshold"] },
    }).sort({ quantity: 1 });
    if (lowStockProducts.length == 0) {
      return res
        .status(200)
        .json({
          message: "All stock levels are healthy 🚀",
          lowStockProducts: [],
        });
    }
    res.status(200).json({ lowStockProducts });
  } catch (err) {
    console.log(err.message);
    return res
      .status(500)
      .json({ error: "Server Error While fetching low stock alerts" });
  }
};

module.exports = lowStockAlerts;
