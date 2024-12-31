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

        from: {
            type: DataTypes.ENUM('user', 'provider'),
            allowNull: false,
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

    }, {
    timestamps: false
})

Conversation.hasMany(Message, {
    foreignKey: 'conversationId',
    onDelete: 'CASCADE'
})

Message.belongsTo(Conversation, {
    foreignKey: 'conversationId',
    onDelete: 'CASCADE'
})


module.exports = Message;