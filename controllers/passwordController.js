const { where } = require('sequelize');
const User = require('../models/userModel');
const crypto = require('crypto');
const dotenv = require('dotenv');
const { env } = require('process');
const jwt = require('jsonwebtoken');
const { sendEmail } = require('../services/email.service');
const { generateOTP } = require('../utils/otpGetnerator');
const bcryptjs = require('bcryptjs');

dotenv.config();

// Forgot password logic
exports.verifyEmail = async (req, res) => {
    try {
        const user = await User.findOne(
            {
                attributes: ['id', 'email'],
                where: { email: req.body.email }
            }
        );
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        let otp = generateOTP(6);

        let to = user.email;
        let subject = 'HEALTHAPP';
        let html = `<h1>Welcome to HEALTHAPP</h1>
        <p>Hi,</p>
        <p>We received a request to change your password</p>
        <p>Use the OTP below to change your password</p>
        <h1 style="margin: 20px; font-size: 20px;">${otp}</h1>`;

        let emailSendStatus = 'initial';

        await sendEmail(to, subject, '', html)
            .then((res) => {
                emailSendStatus = 'success';
                //console.log(res);
            })
            .catch((err) => {
                emailSendStatus = 'failed';
                console.log(err);
            });

        //generate token
        const jwtToken = jwt.sign(
            {
                payload: {
                    email: user.email,
                    otp: otp
                }
            },
            process.env.TOKEN_SECRET,
            { expiresIn: process.env.PASSWORD_OTP_EXPIRE_TIME * 60 }
        );

        return res.status(200).json({
            message: 'OTP sent to your email',
            otp: otp,
            emailSendStatus: emailSendStatus,
            token: jwtToken
        });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};


exports.verifyOTP = async (req, res) => {
    const { payload, body } = req;
    if (!payload) return res.status(401).json({ error: "Unauthorized" });

    if (body.email !== payload.email) return res.status(401).json({ error: "Unauthorized" });

    if (body.otp !== payload.otp) return res.status(401).json({ error: "Invalid OTP" });

    //const resetToken = crypto.randomBytes(32).toString('hex');

    const token = jwt.sign(
        {
            payload: {
                type: 'password_reset',
                email: body.email
            }
        },
        process.env.TOKEN_SECRET,
        {
            expiresIn: process.env.PASSWORD_RESET_TOKEN_EXPIRE_TIME * 60 //1h
        });

    return res.status(200).json({
        message: 'Password reset approved',
        token: token
    })
};

exports.resetPassword = async (req, res) => {
    const { payload, body } = req;
    if (!payload || payload.type !== 'password_reset') return res.status(401).json({ error: "Unauthorized" });

    if (body.password !== body.confirmPassword) return res.status(400).json({ error: "Passwords do not match" });

    const user = await User.update(
        { password: await bcryptjs.hash(body.password, 10) },
        {
            where: {
                email: payload.email
            },
        },
    );

    return res.status(200).json({
        message: 'Password reset successful'
    });
}
