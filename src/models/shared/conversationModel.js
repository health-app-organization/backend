const { DataTypes } = require('sequelize');
const sequelize = require('../../db/database');
const User = require('../users/userModel');
const Provider = require('../providers/providerModel');

const Conversation = sequelize.define('Conversation',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },

        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            onUpdate: DataTypes.NOW
        },
    }
)


Provider.hasMany(Conversation, {
    foreignKey: 'providerId'
})

Conversation.belongsTo(Provider, {
    foreignKey: 'providerId'
})

User.hasMany(Conversation, {
    foreignKey: 'providerId'
})

Conversation.belongsTo(User, {
    foreignKey: 'providerId'
})

module.exports = Conversation;