const User = require('../../../models/User.js');
const bcrypt = require('bcrypt');

const checkUserExists = async (username, email) => {
  const user = await User.findOne({ $or: [{ username }, { email }] });
  return !!user;
};

const createUser = async (username, email, password) => {
  const newUser = new User({ username, email, password });

  const salt = await bcrypt.genSalt(10);
  newUser.password = await bcrypt.hash(newUser.password, salt);

  return newUser.save();
};
const checkPasswordvalid = async(password) => {
  const isAlphanumeric = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/; 
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/; 

    if (!isAlphanumeric.test(password) || !hasSpecialChar.test(password)) {
      return ({
        error:
          'Password must be alphanumeric, contain at least one special character, and have a minimum length of 8 characters',
      });
    }
}

module.exports = {
  checkUserExists,
  createUser,
  checkPasswordvalid
};
