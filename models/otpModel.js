const { DataTypes } = require('sequelize');
const sequelize = require('../db/database');

const OTP = sequelize.define('OTP', {
    email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: false,
        // validate: {
        //     isEmail: {
        //         msg: 'Invalid email address'
        //     },
        //     isNull: {
        //         msg: 'Email is required'
        //     }
        // }
    },

    otp: {
        type: DataTypes.STRING(6),
        allowNull: false,
        // validate: {
        //     isNull: {
        //         msg: 'OTP is required'
        //     },
        //     is: {
        //         args: ["^[0-9]{6}$"],
        //         msg: 'OTP must be 6 digits'
        //     }
        // }
    },

    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },

    expiresAt: {
        type: DataTypes.DATE,
        allowNull: false,
        // validate: {
        //     isNull: {
        //         msg: 'Expires at is required'
        //     }
        // }
    },
},
    {
        tableName: 'otps',
        timestamps: false
    });

module.exports = OTP;
