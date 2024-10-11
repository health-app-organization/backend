const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();


const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_PORT === 465 ? true : false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    tls: {
        rejectUnauthorized: false  // Disable certificate validation
    }
});


async function sendEmail(to, subject, text, html) {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: to,
        subject: subject,
        text: text,
        html: html
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        return {
            success: true,
            message: 'Email sent successfully',
            info: info
        };
    } catch (error) {

        return {
            success: false,
            message: 'Failed to send email',
            error: error
        }
    }
}

module.exports = {
    sendEmail
}