const { DataTypes } = require('sequelize');
const sequelize = require('../../db/database');
const User = require('./userModel');

const Medicine = sequelize.define('Medicine', {
    name: {
        type: DataTypes.STRING(30),
        allowNull: false,
    },

    dose: {
        type: DataTypes.STRING(10),
        allowNull: false,
    },

    startDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    }

}, {
    tableName: 'medicines',
    timestamps: false,
});

// Associations
User.hasMany(Medicine, {
    foreignKey: 'userId',
    as: "medicines",
    onDelete: 'CASCADE'
});

Medicine.belongsTo(User, {
    foreignKey: 'userId',
    as: "user",
    onDelete: 'CASCADE'
});

module.exports = Medicine;
