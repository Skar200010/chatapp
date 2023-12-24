const loginUtil = require('./utils');
const User = require('../../../models/User');
const { scheduleUserLoginNotification } = require('../cronjob/userLoginNotifier');
const Token = require('../../../models/tokenModel')

const loginService = async (bodyData) => {
  try {
    const {username, password}= bodyData
    const user = await User.findOne({ username });
    
      if (!user) {

        return {success : false , message : 'user not found'}
      }


    const isPasswordMatch = await loginUtil.comparePassword(password, user.password);
    if (isPasswordMatch){
      const token = await loginUtil.generateToken(user._id , user.username )
      await Token.create({ userId: user._id, token, status: true });
      
      const loginTime = new Date ()
      scheduleUserLoginNotification(user.username , loginTime);

      return { success: true, token, message: 'Login successful' };
    }
    else {
      return{ success : false , message : 'incorrect password'}
    }

    // return isPasswordMatch;
  } 
    catch (error) {
    console.error('Error in loginUser:', error);
    throw new Error('Authentication failed');
  }
};


module.exports = {
  loginService
};
