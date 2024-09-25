const { DataTypes } = require('sequelize');
const sequelize = require('../db/database');

const Provider = sequelize.define('Provider', {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
},
    {
        tableName: 'providers',
        updatedAt: false
    });

module.exports = Provider;
