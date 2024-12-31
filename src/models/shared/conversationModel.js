const { DataTypes } = require('sequelize');
const sequelize = require('../../db/database');
const User = require('../users/userModel');
const Provider = require('../providers/providerModel');

const Conversation = sequelize.define(
    'Conversation',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        providerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Provider,
                key: 'id',
            },
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: 'id',
            },
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        uniqueKeys: {
            unique_user_provider: {
                fields: ['userId', 'providerId'],
            },
        },
        timestamps: true,
    }
);

// Associations
Provider.hasMany(Conversation, {
    foreignKey: 'providerId',
    as: 'conversations',
    onDelete: 'CASCADE',
});

Conversation.belongsTo(Provider, {
    foreignKey: 'providerId',
    as: 'provider',
    onDelete: 'CASCADE',
});

User.hasMany(Conversation, {
    foreignKey: 'userId',
    as: 'conversations',
    onDelete: 'CASCADE',
});

Conversation.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user',
    onDelete: 'CASCADE',
});

module.exports = Conversation;
