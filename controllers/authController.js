const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
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
    const { email, password, phone } = req.body;
    const { status } = req.params;

    if (!email || !password || !phone) {
        return res.status(400).json({ error: "Please provide all fields" });
    }

    try {
        if (status === 'user') {
            let user = await User.findOne({
                where: { email: email }
            })

            if (user) {
                return res.status(400).json({ error: "User already exists" });
            }

            user = await User.create({
                email: email,
                password: password,
                phone: phone,
            });
        } else {

        }

        res.status(200).json({ message: 'User created successfully', user: user });
    }
    catch (error) {
        res.status(500).json({ message: "Error creating user", error: error.message });
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

    }

    if (!userObj) {
        return res.status(401).json({ error: "User not Found" });
    }

    userObj.password = undefined;
    return res.status(200).json(userObj);
}