const { DataTypes } = require('sequelize');
const bcryptjs = require('bcryptjs');
const sequelize = require('../db/database');

const User = sequelize.define('User', {
    firstName: {
        type: DataTypes.STRING(30),
        allowNull: true,
    },

    lastName: {
        type: DataTypes.STRING(30),
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    birthDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
    },

    gender: {
        type: DataTypes.ENUM('male', 'female'),
        defaultValue: 'male'
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM('user', 'admin'),
        defaultValue: 'user'
    }
},
    {
        tableName: 'users',
        updatedAt: false
    });

module.exports = User;
