const express = require('express');
const { register, login, logout } = require('../controllers/userControllers');
const { isAuthenticated } = require('../middleware/Auth');

const router = express.Router();

router.post('/register',register)
.post('/login',login)
.post('/logout',isAuthenticated,logout);

module.exports = router;