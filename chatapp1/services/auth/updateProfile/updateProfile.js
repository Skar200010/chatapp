const bcrypt = require('bcrypt');
const User = require('../../../models/User'); 

const updateProfileService = async (userId, currentPassword, newPassword) => {
  try {
    const user = await User.findById(userId);
    if(!user){
        throw new Error ('user not found')
    }

    const isPasswordCorrect = await bcrypt.compare(currentPassword, user.password);

    if (!isPasswordCorrect) {
      throw new Error('Invalid current password');
    }

    if (currentPassword === newPassword){
        throw new Error('you cannot set current and new password same ')
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;

    await user.save();
    return { success : true , message: "password update successfully"}

  } catch (error) {
    console.error('Error in updatePassword service:', error);
    throw new Error('Error updating password');
  }
};

module.exports = {
  updateProfileService,
};
