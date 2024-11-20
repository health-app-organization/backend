const { DataTypes } = require('sequelize');
const sequelize = require('../../db/database');
const Provider = require('./providerModel');

const Availability = sequelize.define('Availability',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        dayOfWeek: {
            type: DataTypes.ENUM('Mondays', 'Tuesdays', 'Wednesdays', 'Thursdays', 'Fridays', 'Saturdays', 'Sundays'),
            allowNull: false,
        },

        startTime: {
            type: DataTypes.TIME,
            allowNull: false,
        },

        endTime: {
            type: DataTypes.TIME,
            allowNull: false,
        },

        service: {
            type: DataTypes.ENUM('Consultation', 'Visitation'),
            allowNull: false,
        }
    })

Availability.belongsTo(Provider, { foreignKey: 'providerId' });
Provider.hasMany(Availability, { foreignKey: 'providerId' });

module.exports = Availability;