const { DataTypes } = require('sequelize');
const sequelize = require('../../db/database');
const Provider = require('../providers/providerModel');
const User = require('../users/userModel');

const Appointment = sequelize.define('Appointment',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
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
    })

Provider.hasMany(Appointment, {
    foreignKey: 'providerId'
})

Appointment.belongsTo(Provider, {
    foreignKey: 'providerId'
})

User.hasMany(Appointment, {
    foreignKey: 'userId'
})

Appointment.belongsTo(User, {
    foreignKey: 'userId'
})

module.exports = Appointment;