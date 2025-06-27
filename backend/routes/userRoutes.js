const express = require('express');
const { register, login, logout } = require('../controllers/userControllers');
const { isAuthenticated } = require('../middleware/Auth');

const router = express.Router();

router.post('/register',register)
.post('/login',login)
.post('/logout',isAuthenticated,logout)
.get("/check-auth", isAuthenticated, (req, res) => {
  res.status(200).json({ authenticated: true });
});

module.exports = router;