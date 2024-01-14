const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();
const User = require('../../../models/User')

const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

const generateToken = async (userId, username ) => {
  const payload = { id: userId, username  };
  return jwt.sign(payload,`${process.env.TOKEN_SECRET}`, { expiresIn: 3600 });
  
};

module.exports = {
  comparePassword,
  generateToken,
};