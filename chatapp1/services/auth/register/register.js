const registrationUtil = require('./utils.js');

const registerService = async (bodyData) => {
  try {
    const {username , email , password} = bodyData
    if (!username || !email || !password) {
      throw new Error('Username, email, and password are required');
    }

    const checkPasswordvalid = await registrationUtil.checkPasswordvalid(password)
      if(checkPasswordvalid){
        throw new Error('Password must be alphanumeric, contain at least one special character, and have a minimum length of 8 characters')

      }
    

    const isUserExists = await registrationUtil.checkUserExists(username, email);
    if (isUserExists) {
      throw new Error('Username or email already in use');
    }

    const newUser = await registrationUtil.createUser(username, email, password);
    console.log(newUser)

    return newUser;
  } catch (error) {
    console.error('Error in registerUser:', error);
    throw new Error('User registration failed');
  }
};

module.exports = {
  registerService
};