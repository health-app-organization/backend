const { DataTypes } = require('sequelize');
const sequelize = require('../../db/database');
const Provider = require('./providerModel');

const Rating = sequelize.define('Rating',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        rating: {
            type: DataTypes.TINYINT,
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

module.exports = Rating;