const { DataTypes } = require('sequelize');
const sequelize = require('../../db/database');
const User = require('../users/userModel');

const Notification = sequelize.define('Notification',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        subject: {
            type: DataTypes.STRING(100),
            allowNull: false
        },

        message: {
            type: DataTypes.STRING(500),
            allowNull: false
        },

        read: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },

        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: User,
                key: 'id'
            },

            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },

        type: {
            type: DataTypes.ENUM('user', 'provider'),
            allowNull: false,
            defaultValue: 'user'
        }
    })

module.exports = Notification;