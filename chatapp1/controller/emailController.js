// mailController.js
const { sendPasswordResetEmail } = require('../services/auth/mailer/mailServiec');

const sendResetPasswordEmailController = async (req, res) => {
  const { recipientEmail } = req.body;

  try {
    await sendPasswordResetEmail(recipientEmail);
    res.status(200).json({ success: ' email sent successfully' });
  } catch (error) {
    console.error('Error in sending  email:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { sendResetPasswordEmailController };
