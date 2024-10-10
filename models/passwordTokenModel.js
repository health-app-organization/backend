const { DataTypes } = require('sequelize');
const sequelize = require('../db/database');

const PasswordToken = sequelize.define('OTP', {
    email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: false,
    },

    token: {
        type: DataTypes.STRING(6),
        allowNull: false,
    },

    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },

    expiresAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
},
    {
        tableName: 'password_reset_token',
        timestamps: false
    });

module.exports = PasswordToken;
