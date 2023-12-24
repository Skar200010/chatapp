const Token = require('../../../../models/tokenModel'); 

const addTokenToBlacklist = async (token) => {
  await Token.findOneAndUpdate({ token }, { $set: { status: false } });
};

const isTokenBlacklisted = async (token) => {
  const tokenStatus = await Token.findOne({ token, status: false });
  return !!tokenStatus;
};

module.exports = {
  addTokenToBlacklist,
  isTokenBlacklisted,
};
