const express = require('express');
const router = express.Router();
const authController = require('../controller/authController'); // Import your authentication controller

// Register a new user
router.post('/register', authController.register);

// User login
router.post('/login', authController.login);


module.exports = router;
