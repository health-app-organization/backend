const { DataTypes } = require('sequelize');
const sequelize = require('../../db/database');
const Provider = require('./providerModel');

const Specialization = sequelize.define('Specialization',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        specialization: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
    })

module.exports = Specialization;