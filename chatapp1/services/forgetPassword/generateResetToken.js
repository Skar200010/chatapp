const crypto = require('crypto')
const User =  require('../../models/User')
const passwordReset = require('../../models/Password')

const generateResetToken = async (req , res , next) => {
    try {

        const { email } = req.body ;

        const user = await User.findOne({email});
        if (!user)
        return res.status (400).json({status : false , message : 'user not found'})

        const resetToken = crypto.randomBytes(20).toString('hex');
        const expirationDate = new Date ();

        expirationDate.setHours(expirationDate.getHours() + 1);

        await passwordReset.create({
            userId : user._id,
            resetToken,
            expiresAt : expirationDate,
        })

        return res.status(200).json({ success:true , resetToken, message : 'Reset link sent successfully'})
        
    } catch (error) {
        console.error('Error in to send reset token ' , error)
        return res.status(500).json({message : 'Internal server Error '})
        
    }

}

module.exports ={
generateResetToken
}