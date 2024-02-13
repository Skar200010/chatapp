const User = require('../../../models/User')
const registrationUtil = require('../register/utils');


const updateUserService = async (userId, newData ,username , email) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(userId, newData, { new: true }).select('-password');

        const isUserExists = await registrationUtil.checkUserExists(username, email);
        if (isUserExists) {
          throw new Error('Username or email already in use');
        }
        return updatedUser;

    } catch (error) {
        console.log("error");
        throw error;
    }
};

module.exports = {
    updateUserService
}