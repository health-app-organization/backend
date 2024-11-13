const { DataTypes } = require('sequelize');
const sequelize = require('../../db/database');
const Provider = require('./providerModel');

const Department = sequelize.define('Department',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        department: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
    })

module.exports = Department;