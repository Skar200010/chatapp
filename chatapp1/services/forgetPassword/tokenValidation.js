const passwordReset = require('../../models/Password')

const tokenValidation =  async (req , res ,next ) => {

    try {

        const {token} = req.params 
         const resetInfo = await passwordReset.findOne({ resetToken : token , expiresAt : {$gt : new Date ()}})
        
         if (!resetInfo){
            return res.status(400).json({ error : 'invalid token or expired reset token'})

         }

         req.userId = resetInfo.userId;
        
        return res.render('forgetPassword', { token  });
        

    } 
    
    catch (error) {
        console.error('Error in validating reset token', error)
        return res.status(500).json({ error : 'Internal server error'})
        
    }
    
}
module.exports = {
    tokenValidation
}