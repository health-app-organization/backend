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

        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,

            references: {
                model: User,
                key: 'id'
            },

            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },

        providerId: {
            type: DataTypes.INTEGER,
            allowNull: false,

            references: {
                model: Provider,
                key: 'id'
            },

            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
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
    })

module.exports = Conversation;