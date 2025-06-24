const express = require('express');
const { register, login, logout } = require('../controllers/userControllers');

const router = express.Router();

router.post('/register',register)
.post('/login',login)
.post('/logout',logout);

module.exports = router;