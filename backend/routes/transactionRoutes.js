const express = require("express");
const {
  addTransaction,
  getAllTransactions,
} = require("../controllers/transactionControllers");

const router = express.Router();

router.post("/", addTransaction).get("/", getAllTransactions);

module.exports = router;
