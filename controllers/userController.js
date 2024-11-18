const bcryptjs = require('bcryptjs');
const User = require('../models/users/userModel');
const { paginate, getFields } = require('../utils/services');
const { DELETE } = require('sequelize/lib/query-types');


// Controller logic for handling user routes
exports.getAllUsers = async (req, res) => {
    const { page, count, fields } = req.query;
    let { metadata } = req.query

    if (page && metadata !== false)
        metadata = true;


    try {
        const users = await User.findAll({
            attributes: fields ? ['id', ...getFields(fields)] : { exclude: ['password'] },
            ...paginate(page, count)
        });

        if (metadata) {
            const total = await User.count();
            const totalPages = Math.ceil(total / count);

            let pagemetadata = {
                currentPage: Number(page),
                numPerPage: Number(count),
                totalPages: totalPages,
                totalItems: total
            }

            return res.status(200).json({ data: users, metadata: pagemetadata });
        }

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
        res.status(400).json({ message: 'Error creating user', error: error.message });
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

exports.updateUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        await user.update(req.body);
        user.password = undefined;
        return res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error });
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
}

