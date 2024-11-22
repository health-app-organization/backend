const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users/userModel');
const Provider = require('../models/providers/providerModel');
const { sendEmail } = require('../services/email.service');
const { generateOTP } = require('../utils/otpGetnerator');
const dotenv = require('dotenv');
dotenv.config();
const env = process.env

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const { status } = req.params;

    let user;

    if (status === 'user') {
        user = await User.findOne({
            where: { email: email }
        })
    } else {

    }

    if (!user) {
        return res.status(400).json({ error: "Invalid Email" });
    }

    const validPassword = await bcrypt.compare(password, user.password)

    if (!validPassword) {
        return res.status(400).json({ error: "Incorrect password" });
    }

    // TODO: generate token
    const token = jwt.sign(
        {
            payload: { id: user.id, email: user.email, role: status }
        },
        env.TOKEN_SECRET,
        { expiresIn: `${env.TOKEN_EXPIRE_TIME / 60}h` }
    );

    res.status(200).json({ message: 'Login successful', token: token });
}

exports.register = async (req, res) => {
    const { email } = req.body;
    const { status } = req.params;

    if (!email) {
        return res.status(400).json({ error: "Please provide an email" });
    }

    try {

        let user = await (status === 'user' ? User : Provider).findOne({
            where: { email: email },
            attributes: ['id', 'email']
        })

        if (user) {
            return res.status(400).json({ error: `${status === 'user' ? 'User' : 'Provider'} already exists` });
        }

        let otp = generateOTP(6);

        console.log(otp);

        let to = email;
        console.log(email)
        let subject = 'HEALTHAPP';
        let html = `<h1>Welcome to HEALTHAPP</h1>
        <p>Hi,</p>
        <p>Use the OTP below to verify your email</p>
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
                    email: email,
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
    }
    catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

exports.verifyOTP = async (req, res) => {
    const { payload, body } = req;
    if (!payload) return res.status(401).json({ error: "Unauthorized" });

    if (body.email !== payload.email) return res.status(401).json({ error: "Unauthorized" });

    if (body.otp !== payload.otp) return res.status(401).json({ error: "Invalid OTP" });


    return res.status(200).json({
        message: 'OTP verified successfully'
    })
};

exports.me = async (req, res) => {
    const { payload } = req;


    if (!payload) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    let userObj;

    if (payload.role === 'user') {
        userObj = await User.findOne({
            where: { id: payload.id }
        })
    } else {
        userObj = await Provider.findOne({
            where: { id: payload.id }
        })
    }

    if (!userObj) {
        return res.status(401).json({ error: "User not Found" });
    }

    userObj.password = undefined;
    return res.status(200).json(userObj);
}