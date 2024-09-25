const { DataTypes } = require('sequelize');
const bcryptjs = require('bcryptjs');
const sequelize = require('../db/database');

const User = sequelize.define('User', {
    firstName: {
        type: DataTypes.STRING(30),
        allowNull: false,
    },

    lastName: {
        type: DataTypes.STRING(30),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    birthDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
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
