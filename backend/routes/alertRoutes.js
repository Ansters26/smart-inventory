const express = require('express');
const lowStockAlerts = require('../controllers/alertController');
const { isAuthenticated } = require('../middleware/Auth');
const router = express.Router();


router.get('/',isAuthenticated,lowStockAlerts);

module.exports = router;