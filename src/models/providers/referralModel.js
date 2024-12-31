const { DataTypes } = require('sequelize');
const sequelize = require('../../db/database');
const User = require('../users/userModel');
const Provider = require('./providerModel');
const Clinic = require('./clinicModel');

const Referral = sequelize.define('Referral', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },

    reason: {
        type: DataTypes.STRING(300),
        allowNull: false,
    },

    additionalDetails: {
        type: DataTypes.STRING(300),
        allowNull: false,
    },

    status: {
        type: DataTypes.ENUM('pending', 'accepted', 'rejected'),
        allowNull: false,
        defaultValue: 'pending',
    },

});

User.hasMany(Referral, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
});

Referral.belongsTo(User, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
});

Provider.hasMany(Referral, {
    foreignKey: 'providerId',
    onDelete: 'CASCADE',
});

Referral.belongsTo(Provider, {
    foreignKey: 'providerId',
    onDelete: 'CASCADE',
});

Clinic.hasMany(Referral, {
    foreignKey: 'clinicId',
    onDelete: 'CASCADE',
});

Referral.belongsTo(Clinic, {
    foreignKey: 'clinicId',
    onDelete: 'CASCADE',
});

module.exports = Referral;
