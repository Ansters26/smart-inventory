const forcastStockForProduct = require("../services/forcastService");

const getForcast = async (req, res) => {
  try {
    const { productId } = req.params;

    const result = await forcastStockForProduct(productId);

    res.status(200).json({
      message: "Forecast successful",
      productId,
      ...result,
    });
  } catch (err) {
    console.error("Forecast error:", err.message);
    res.status(500).json({ error: "Failed to generate forecast" });
  }
};

module.exports = getForcast;
