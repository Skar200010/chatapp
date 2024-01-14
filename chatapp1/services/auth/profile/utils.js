const User = require('../../../models/User');
const mongoose = require('mongoose');
const fetchUserProfile = async (userId) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(userId))
     {
      console.log(userId)
      throw new Error('Invalid user ID');
    }

    const user = await User.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    const userProfile = {
      username: user.username,
      email: user.email,
      userId : user._id
    };

    return userProfile;
  } catch (error) {
    console.error('Error in fetchUserProfile:', error);
    throw new Error('Error fetching user profile');
  }
};

module.exports = {
  fetchUserProfile,
};
