const profileUtil = require('./utils');

const profileService = async (userId) => {

  try {
    
    const userProfile = await profileUtil.fetchUserProfile(userId);

    return userProfile;
  } catch (error) {
    console.error('Error in getProfile:', error);
    throw new Error('Error fetching user profile');
  }
};
module.exports = {
  profileService,
};
