const { DataTypes } = require('sequelize');
const sequelize = require('../../db/database');
const Provider = require('./providerModel');

const Registration = sequelize.define('Registration',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        regNumber: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true
        },

        regCouncil: {
            type: DataTypes.STRING(100),
            allowNull: false
        },

        regYear: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        providerId: {
            type: DataTypes.INTEGER,
            references: {
                model: Provider,
                key: 'id'
            }
        }
    })

module.exports = Registration;