const { DataTypes } = require('sequelize');
const sequelize = require('../../db/database');
const Provider = require('./providerModel');

const Qualification = sequelize.define('Qualification',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        qualification: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },

        institution: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },

        startYear: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },

        endYear: {
            type: DataTypes.DATEONLY,
            allowNull: false,
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

module.exports = Qualification;