const { DataTypes } = require('sequelize');
const sequelize = require('../db/database');
const User = require('./userModel');

const TestReport = sequelize.define('TestReport',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        reportName: {
            type: DataTypes.STRING(100),
            allowNull: false
        },

        doctorsName: {
            type: DataTypes.STRING(100),
            allowNull: false
        },

        dateTime: {
            type: DataTypes.DATE,
            allowNull: false
        },

        description: {
            type: DataTypes.STRING(500),
            allowNull: false
        },

        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: User,
                key: 'id'
            }
        }
    })

module.exports = TestReport;