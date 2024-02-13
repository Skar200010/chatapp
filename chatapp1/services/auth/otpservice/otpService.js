const twilio = require('twilio')

const accountSid = 'AC450ab086ed8552015a52c549bf2736c2';
const authToken = '0da1ae8fc5e605f6d9463b74d95be903';
const twilioPhoneNumber = '+19286676014';

const client = twilio(accountSid, authToken);



function generateOtp() {
    return Math.floor(1000 + Math.random() * 9000).toString();
}

function sendOtpViaSMS(phoneNumber, otp) {
    const message = `Your OTP is: ${otp}`;
    return client.messages.create({
        body: message,
        from: twilioPhoneNumber,
        to: phoneNumber
    });
}

const otpgenerator = async (req ,res ) => {
    try {
        const {phoneNumber} = req.body
        if (!phoneNumber) {
            return res.status(400).json({ error: 'Phone number is required.' });
        }
        const otp = generateOtp();
        await sendOtpViaSMS(phoneNumber, otp);
        return res.json({ success: true, message: 'OTP sent successfully.' });
        
    } catch (error) {
        console.error('Error sending OTP:', error.message);
        return res.status(500).json({ error: 'Internal server error.' });
        
    }

}
module.exports = {otpgenerator}