const jwt = require('jsonwebtoken');
require('dotenv').config();
const Token = require('../models/tokenModel')

const authenticateToken = async (req, res, next) => {
  try {
     const token = req.headers.authorization.split(' ')[1];

    console.log(token);
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

   
    const tokenData = jwt.verify(token, `${process.env.TOKEN_SECRET}`);
    const userId = tokenData.id;
    console.log(tokenData)

    const tokenStatus = await Token.findOne({ userId, token, status: true });
    if (!tokenStatus) {
      console.log('Token Status:', tokenStatus);
      return res.status(401).json({ error: 'Unauthorized: Token is inactive or invalid' });
    }
    req.userId = userId;
    next();
  } catch (error) {
    console.error('Error in authenticateToken:', error);
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Unauthorized: Token has expired' });
    }
    return res.status(403).json({ error: 'Forbidden: Invalid token' });
  }
};
module.exports = {
  authenticateToken,
};
