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

    })

Conversation.hasMany(Message, {
    foreignKey: 'conversationId'
})

Message.belongsTo(Conversation, {
    foreignKey: 'conversationId'
})


module.exports = Message;