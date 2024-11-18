const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users/userModel');
const Provider = require('../models/providers/providerModel');
const { sendEmail } = require('../services/email.service');
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
    const { email, password, phoneNumber } = req.body;
    const { status } = req.params;

    if (!email || !password || !phoneNumber) {
        return res.status(400).json({ error: "Please provide all fields" });
    }

    try {

        let user = await (status === 'user' ? User : Provider).findOne({
            where: { email: email }
        })

        if (user) {
            return res.status(400).json({ error: `${status === 'user' ? 'User' : 'Provider'} already exists` });
        }

        user = await User.create({
            email: email,
            password: password,
            phoneNumber: phoneNumber,
        });

        let to = email;
        let subject = 'HEALTHAPP';
        let html = `<h1>Welcome to HEALTHAPP</h1>
        <p>Hi,</p>
        <p>Thank you for choosing HealthApp</p>`;

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


        res.status(200).json({
            message: `${status === 'user' ? 'User' : 'Provider'} created successfully`,
            user: user,
            emailSendStatus: emailSendStatus
        });
    }
    catch (error) {
        res.status(500).json({
            message: `Error creating ${status === 'user' ? 'User' : 'Provider'}`,
            error
        });
    }
}

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