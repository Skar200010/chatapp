const express = require('express');
const router = express.Router();
const loginController = require('../controller/logincontroller');
const registerController = require('../controller/registercontroller')
const profileController = require('../controller/profileController')
const authenticate = require('../Middleware/authenticate')
const logoutController = require('../controller/logoutController')



// Register a new user
router.post('/register', registerController.register);

// User login
router.post('/login', loginController.login);

// get userProfile
router.get('/profile',authenticate.authenticateToken,profileController.profile)

router.post('/logout', logoutController.logout)





module.exports = router;

