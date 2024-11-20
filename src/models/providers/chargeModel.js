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

        home: {
            type: DataTypes.FLOAT,
            allowNull: true
        },

        video: {
            type: DataTypes.FLOAT,
            allowNull: true
        },

        clinic: {
            type: DataTypes.FLOAT,
            allowNull: true
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