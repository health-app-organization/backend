const { DataTypes } = require('sequelize');
const sequelize = require('../../db/database');
const User = require('../users/userModel');
const Conversation = require('../shared/conversationModel');

const Message = sequelize.define('Message',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
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

        message: {
            type: DataTypes.TEXT,
            allowNull: false
        },

        timestamp: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },

        isDeleted: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },

        conversationId: {
            type: DataTypes.INTEGER,

            references: {
                model: Conversation,
                key: 'id'
            },

            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }
    })

module.exports = Message;