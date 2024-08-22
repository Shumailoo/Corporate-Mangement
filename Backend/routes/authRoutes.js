const express = require('express');
const { signUp, logIn, logOut, logInStatus } = require('../controllers/authController');
const router = express.Router();

router.get("/status", logInStatus);
router.post('/register', signUp);
router.post('/login', logIn);
router.post('/logout', logOut);

module.exports = router;