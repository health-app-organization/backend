const { DataTypes } = require('sequelize');
const sequelize = require('../../db/database');
const Provider = require('./providerModel');

const Review = sequelize.define('Review',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        review: {
            type: DataTypes.STRING(300),
            allowNull: false
        },

        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: Provider,
                key: 'id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },

        providerId: {
            type: DataTypes.INTEGER,
            references: {
                model: Provider,
                key: 'id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }
    })

module.exports = Review;