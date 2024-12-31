const { DataTypes } = require('sequelize');
const sequelize = require('../../db/database');
const Provider = require('./providerModel');

const Clinic = sequelize.define('Clinic', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },

    name: {
        type: DataTypes.STRING(30),
        allowNull: false,
    },

    email: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },

    website: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },

    phone: {
        type: DataTypes.STRING(15),
        allowNull: false,
    },

    address: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },

})

Provider.belongsToMany(Clinic, { foreignKey: 'providerId', through: 'ProviderClinic' });
Clinic.belongsToMany(Provider, { foreignKey: 'clinicId', through: 'ProviderClinic' });

module.exports = Clinic;