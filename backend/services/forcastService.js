const Transaction = require("../models/Transcation");

const forcastStockForProduct = async (productId) => {
  const sixtyDaysAgo = new Date();
  sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);

  const transactions = await Transaction.find({
    productId,
    type: "OUT",
    date: { $gte: sixtyDaysAgo },
  });

  if (transactions.length === 0)
    return { forecast: 0, reason: "No recent data", chartData: [] };

  const totalQuantity = transactions.reduce((sum, txn) => sum + txn.quantity, 0);

  const activeDaysSet = new Set(
    transactions.map((txn) => txn.date.toISOString().split("T")[0])
  );
  const activeDays = activeDaysSet.size || 1;

  const avgPerDay = totalQuantity / activeDays;
  const forecast = Math.ceil(avgPerDay * 30);

  const dailyMap = {};
  transactions.forEach((txn) => {
    const dateKey = txn.date.toISOString().split("T")[0];
    if (!dailyMap[dateKey]) dailyMap[dateKey] = 0;
    dailyMap[dateKey] += txn.quantity;
  });

  const chartData = Object.entries(dailyMap).map(([date, quantity]) => ({
    date,
    quantity,
  }));

  return {
    forecast,
    averageDailySales: +avgPerDay.toFixed(2),
    totalOutTransactions: transactions.length,
    totalQuantitySold: totalQuantity,
    chartData,
  };
};

module.exports = forcastStockForProduct;
