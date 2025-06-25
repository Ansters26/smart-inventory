const express = require('express');
const { isAuthenticated } = require('../middleware/Auth');
const getForcast = require('../controllers/forcastController');
const router = express.Router();


router.get('/:productId',isAuthenticated,getForcast);


module.exports = router;