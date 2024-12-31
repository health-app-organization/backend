const { DataTypes } = require('sequelize');
const sequelize = require('../../db/database');
const Prescription = require('./prescriptionModel');

const Drug = sequelize.define('Drug', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },

    concentrationMg: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    quantity: {
        type: DataTypes.FLOAT,
        allowNull: false
    },

    unit: {
        type: DataTypes.STRING(10),
        allowNull: false
    }
}, {
    updatedAt: false,
})

Prescription.hasMany(Drug, {
    as: 'drugs',
    foreignKey: 'foreignKey',
    onDelete: 'CASCADE'
})

Drug.belongsTo(Prescription, {
    as: 'prescription',
    foreignKey: 'foreignKey',
    onDelete: 'CASCADE'
})

module.exports = Drug;