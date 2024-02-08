const User = require('../../../models/User')

const getUserService = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        return users; 
    } catch (error) {
        console.log("error");
        throw error;  
    }
};

module.exports = {
    getUserService
};