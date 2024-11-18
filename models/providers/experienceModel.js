const { DataTypes } = require('sequelize');
const sequelize = require('../../db/database');
const Provider = require('./providerModel');

const Experience = sequelize.define('Experience',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        institution: {
            type: DataTypes.STRING(50),
            allowNull: false
        },

        startDate: {
            type: DataTypes.STRING(10),
            allowNull: false
        },

        endDate: {
            type: DataTypes.STRING(10),
            allowNull: false
        },

        position: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
    })

Provider.hasMany(Experience, { foreignKey: 'providerId' });
Experience.belongsTo(Provider, { foreignKey: 'providerId' });

module.exports = Experience;