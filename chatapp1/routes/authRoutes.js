const express = require('express');
const app = express();
const router = express.Router();
const loginController = require('../controller/logincontroller');
const registerController = require('../controller/registercontroller')
const profileController = require('../controller/profileController')
const authenticate = require('../Middleware/authenticate')
const logoutController = require('../controller/logoutController')
const ledgerController = require('../controller/ledgerController')
const transactionController = require('../controller/transactionController')
const getTransactionController = require('../controller/getTransactionController')
const updateProfileController = require('../controller/updateProfileController')
const generateResetToken = require('../services/forgetPassword/generateResetToken')
const tokenValidation = require('../services/forgetPassword/tokenValidation')
const updatePassword = require('../services/forgetPassword/updatePassword')
const uploadfileService = require('../services/auth/childProcess/uploadFileService')
const mailController = require('../controller/emailController')
const dataReadController = require('../controller/dataReadController')
const userController = require('../controller/userController')
const otpgenerator = require('../services/auth/otpservice/otpService')


// Register a new user
router.post('/register', registerController.register); 

// User login
router.post('/login', loginController.login);
// 
router.post('/ledger' , ledgerController.ledger);

router.post('/transaction' , transactionController.transaction)
// get transaction data using aggreagateion 
router.get('/gettransaction' , getTransactionController.gettransaction)

router.put('/updateProfile/:id' , updateProfileController.updateUser )



 
router.get('/generateResetToken' , generateResetToken.generateResetToken)
// app.get('/validateResetToken/:token', tokenValidation.tokenValidation, (req, res) => {
//     res.render('forgetPassword', { tokenValid: true, title: 'Reset Password Page' });
// });




router.get('/generateResetToken/:token', tokenValidation.tokenValidation)

router.get('/api/failing-endpoint', (req, res, next) => {
    // Intentional error
    throw new Error('Intentional error');
  });
  
  
  
  

router.post('/updatePassword' , updatePassword.resetPassword)

// get userProfile
router.get('/profile',authenticate.authenticateToken,profileController.profile);

router.post('/logout', logoutController.logout);

router.post('/uploadFile', uploadfileService.uploadfileService)


router.post('/sendmail', mailController.sendResetPasswordEmailController)

router.get('/readData' , dataReadController.importData)

router.get('/getDatabyId/:id', dataReadController.getDatabyId) 

router.put('/updateData/:id' , dataReadController.updateDataById)

router.delete('/deleteData/:id' , dataReadController.deleteDataById)
router.get('/getUsers' , userController.getUsers)
router.put('/updateUser/:id' , userController.updateUserById)
router.delete('/deleteUser/:id',userController.deleteUserById)

router.post('/otppost', otpgenerator.otpgenerator)


module.exports = router

