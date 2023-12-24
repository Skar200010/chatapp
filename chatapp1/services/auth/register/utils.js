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

module.exports = {
  checkUserExists,
  createUser,
};
