const { DataTypes } = require('sequelize');
const sequelize = require('../db/database');
const User = require('./userModel');

const MedicalRecord = sequelize.define('MedicalRecord', {
    allergies: {
        type: DataTypes.STRING,
        allowNull: true
    },

    currentMedication: {
        type: DataTypes.STRING,
        allowNull: true
    },

    pastMedication: {
        type: DataTypes.STRING,
        allowNull: true
    },

    chronicDisease: {
        type: DataTypes.STRING,
        allowNull: true
    },
    injuries: {
        type: DataTypes.STRING,
        allowNull: true
    },

    sugeries: {
        type: DataTypes.STRING,
        allowNull: true
    },

    smokingHabits: {
        type: DataTypes.STRING,
        allowNull: true
    },

    alcoholConsumption: {
        type: DataTypes.STRING,
        allowNull: true
    }
},
    {
        tableName: 'medical_records',
        updatedAt: false
    });


User.hasOne(MedicalRecord, {
});

MedicalRecord.belongsTo(User, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
})

module.exports = MedicalRecord;
