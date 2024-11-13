const { DataTypes } = require('sequelize');
const sequelize = require('../../db/database');
const Provider = require('../providers/providerModel');

const Appointment = sequelize.define('Appointment',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: Provider,
                key: 'id'
            }
        },

        dateTime: {
            type: DataTypes.DATE,
            allowNull: false
        },

        durationMins: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        status: {
            type: DataTypes.ENUM('upcoming', 'completed', 'cancelled'),
            defaultValue: 'upcoming'
        },

        urgency: {
            type: DataTypes.ENUM('low', 'high'),
            defaultValue: 'low'
        },

        location: {
            type: DataTypes.STRING(100),
            allowNull: true
        },

        consultationType: {
            type: DataTypes.ENUM('home', 'clinic', 'video'),
            defaultValue: 'clinic'
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

module.exports = Appointment;