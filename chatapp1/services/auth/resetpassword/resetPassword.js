const User = require('../../../models/User')
const Password = require('../../../models/Password')

const resetPassword = async(req , res ) => {
    try {
       
        const { token } = req.params;
  
  
      const resetInfo = await passwordReset.findOne({ resetToken: token, expiresAt: { $gt: new Date() } });
  
      if (!resetInfo) {
        return res.status(400).json({ error: 'Invalid or expired reset token' });
      }
  
    

    } catch (error) {
        console.error('Error in validating reset token', error)
        return res.status(500).json({ error : 'Internal server error'})
        
    }
}

module.exports = {
resetPassword
}
