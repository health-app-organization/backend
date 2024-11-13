const { DataTypes } = require('sequelize');
const sequelize = require('../../db/database');
const Provider = require('./providerModel');

const Charge = sequelize.define('Charge',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        institution: {
            type: DataTypes.STRING(50),
            allowNull: false
        },

        startDate: {
            type: DataTypes.STRING(10),
            allowNull: false
        },

        endDate: {
            type: DataTypes.STRING(10),
            allowNull: false
        },

        position: {
            type: DataTypes.STRING(50),
            allowNull: false
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

module.exports = Charge;