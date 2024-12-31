const path = require('path');
const User = require('../../models/users/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Provider = require('../../models/providers/providerModel');
require('dotenv').config();

exports.sendLoginForm = (req, res) => {
    res.sendFile(path.join(__dirname, '../../views/login.html'));
}

exports.login = async (req, res) => {
    //TODO: Validate username and password
    //TODO: Generate token
    try {
        const { email, password, role } = req.body;

        if (!['user', 'provider'].includes(role)) {
            return res.status(400).json({ error: "Invalid role" });
        }

        let user;

        user = await (role === 'user' ? User : Provider).findOne({
            where: { email: email },
            attributes: ['id', 'firstName', 'lastName', 'email', 'password']
        });

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
                payload: { id: user.id, email: user.email, role }
            },
            process.env.TOKEN_SECRET,
            { expiresIn: `${(process.env.TOKEN_EXPIRE_TIME * 5) / 60}h` }
        );

        res.status(201)
            .cookie('token', token)
            .redirect(`dashboard`);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

exports.dashboard = async (req, res) => {
    const { payload } = req;

    // if (!['user', 'provider'].includes(status)) {
    //     return res.status(400).json({ error: "Invalid status" });
    // }

    let user;

    user = await (payload.role === 'user' ? User : Provider).findOne({
        where: { id: payload.id },
        attributes: ['id', 'firstName', 'lastName', 'email']
    });

    if (!user) {
        return res.status(400).json({ error: "Invalid User" });
    }

    let partners = await (payload.role === 'user' ? Provider : User).findAll({
        attributes: ['id', 'firstName', 'lastName', 'email']
    });

    const modifiedUser = { ...user.dataValues, role: payload.role };

    partners = partners.map(partner => partner.dataValues);

    res.setHeader('Content-Type', 'text/html');
    res.status(201).render('dashboard', { user: modifiedUser, partners });
}