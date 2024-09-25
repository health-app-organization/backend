const bcryptjs = require('bcryptjs');
const User = require('../models/userModel');
const { DELETE } = require('sequelize/lib/query-types');


// Controller logic for handling user routes
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({ attributes: { exclude: ['password'] } });
        return res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving users', error });
    }
};

exports.createUser = async (req, res) => {
    try {
        req.body.password = await bcryptjs.hash(req.body.password, 10);
        const newUser = await User.create(req.body);
        newUser.password = undefined;
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: 'Error creating user', error });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.password = undefined;
        return res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user', error });
    }
};
