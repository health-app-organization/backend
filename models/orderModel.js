const { DataTypes } = require('sequelize');
const sequelize = require('../db/database');
const User = require('./userModel');

const Order = sequelize.define('Order', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },

    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
    },

    total: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },

    status: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },

    item: {
        type: DataTypes.STRING(30),
        allowNull: false,
    }
})

module.exports = Order;