const nodemailer = require('nodemailer')
require('dotenv').config()

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth : {
        user : process.env.SENDER_EMAIL,
        pass : process.env.SMTP_PASS
    }
        });

        const sendEmail = async (mailOptions) => {
            try {

                const info = await transporter.sendMail(mailOptions)
                console.log('Email sent:', info.response);
            } catch (error) {
              console.error('Error sending email:', error);
              throw error;
            }
          };
          
          module.exports = { sendEmail };