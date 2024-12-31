const { DataTypes } = require('sequelize');
const sequelize = require('../../db/database');
const User = require('../users/userModel');
const Provider = require('../providers/providerModel');
const Appointment = require('../users/appointmentModel');


const Prescription = sequelize.define('Prescription', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    description: {
        type: DataTypes.STRING(300),
        allowNull: true,
    }
}, {
    createdAt: false
})

User.hasMany(Prescription, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
})

Prescription.belongsTo(User, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
})

Provider.hasMany(Prescription, {
    foreignKey: 'providerId',
    onDelete: 'CASCADE'
})

Prescription.belongsTo(Provider, {
    foreignKey: 'providerId',
    onDelete: 'CASCADE'
})

Appointment.hasOne(Prescription, {
    foreignKey: 'appointmentId',
    onDelete: 'CASCADE'
})

Prescription.belongsTo(Appointment, {
    foreignKey: 'appointmentId',
    onDelete: 'CASCADE'
})

module.exports = Prescription
