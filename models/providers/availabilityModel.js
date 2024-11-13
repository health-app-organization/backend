const { DataTypes } = require('sequelize');
const sequelize = require('../../db/database');
const Provider = require('./providerModel');

const Availability = sequelize.define('Availability',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        dayOfWeek: {
            type: DataTypes.ENUM('Mondays', 'Tuesdays', 'Wednesdays', 'Thursdays', 'Fridays', 'Saturdays', 'Sundays'),
            allowNull: false,
        },

        startTime: {
            type: DataTypes.TIME,
            allowNull: false,
        },

        endTime: {
            type: DataTypes.TIME,
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

module.exports = Availability;