// mailService.js
const { sendEmail } = require('./utils');
require('dotenv').config();

const sendPasswordResetEmail = async () => {
  const mailOptions = {
    from: process.env.SENDER_EMAIL,
    to: "sohan.s204574106@vcet.edu.in",
    subject: 'Password Reset',
  
  };

  await sendEmail(mailOptions);
};

module.exports = { sendPasswordResetEmail };
