const  mongoose  = require('mongoose')
const User = require('../../../models/User')

const isValiduserId = async (userId) => {
    try {
        
    if (!mongoose.Types.ObjectId.isValid(userId)){
        return false;
    }

    const UserExists = await User.findById({_id : userId})
    return UserExists;


    } catch (error) {
        console.error('Error in isValidUserId utility:', error);
        throw new Error('Error checking userId validity');
        
    }
}
module.exports = {
    isValiduserId,
}