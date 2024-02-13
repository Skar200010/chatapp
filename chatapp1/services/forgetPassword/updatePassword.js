const User = require('../../models/User')
const passwordReset = require('../../models/Password')
const bcrypt = require('bcrypt');
const passwordHistory = require('../../models/paswordHistory')
const resetPassword = async ( req , res , next ) => {

    try {
       
        const {token,newPassword , reEnteredPaasword} = req.body

        if (!token || !newPassword || !reEnteredPaasword){
            return res.status(400).json({error : 'all fields required'})
        }

        if (newPassword !== reEnteredPaasword) {
            return res.status(400).json({ error : 'Password do  not match'})
        }

        const isAlphanumeric = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/; 
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/; 

    if (!isAlphanumeric.test(newPassword) || !hasSpecialChar.test(newPassword)) {
      return res.status(400).json({
        error:
          'Password must be alphanumeric, contain at least one special character, and have a minimum length of 8 characters',
      });
    }
    
        
        const resetInfo = await passwordReset.findOne({resetToken: token , expiresAt : { $gt : new Date ()}})

        if (!resetInfo){
            return res.status(400).json({error : 'invalid or expird token'})
        }

        const hashedPassword = await bcrypt.hash(newPassword , 10);

        //const user = await User.findByIdAndUpdate(resetInfo.userId).select('password passwordHistory')
        const user = await User.findById(resetInfo.userId);

        if (!user) {
          return res.status(500).json({ error: 'Error fetching user details' });
        }
    
        const isNewPasswordInHistory = await passwordHistory.findOne({
          userId: user._id,
          hashedPassword: hashedPassword,
        });
        
    
        if (isNewPasswordInHistory) {
          return res.status(400).json({ error: 'Password should not be one of the last five passwords' });
        }
        
        await passwordHistory.create({
          userId: user._id,
          hashedPassword: hashedPassword,
          createdAt: new Date(),
        });
    
    
        // Update the user's password
        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

         await User.findByIdAndUpdate(resetInfo._id);
        // await passwordReset.findByIdAndDelete(resetInfo._id);
        await passwordReset.findByIdAndDelete(resetInfo._id);

        return res.status(200).json({ success : 'Password updated Successfully'})
        

    } catch (error) {
        console.error('Error in updating password' , error)
        return res.status(500).json({message : 'Internal server Error '})
        
    }

}

module.exports = {
    resetPassword
}