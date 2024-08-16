const express = require('express');
const { signUp, logIn, logOut } = require('../controllers/authController');
const router = express.Router();

router.post('/register', signUp);
router.post('/login', logIn);
router.post('/logout', logOut);

module.exports = router;