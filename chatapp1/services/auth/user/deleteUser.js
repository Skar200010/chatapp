const User = require('../../../models/User')

const deleteUserService = async (userId) => {
    try {
        await User.findByIdAndDelete(userId);
    } catch (error) {
        console.log("error");
        throw error;
    }
};
module.exports={
    deleteUserService
}