const { DataTypes } = require('sequelize');
const sequelize = require('../../db/database');
const Specialization = require('./specializationModel');
const Department = require('./departmentModel');

const Provider = sequelize.define('Provider', {
    firstName: {
        type: DataTypes.STRING(30),
        allowNull: true,
    },
    lastName: {
        type: DataTypes.STRING(30),
        allowNull: true,
    },
    middleName: {
        type: DataTypes.STRING(30),
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    category: {
        type: DataTypes.ENUM('doctor', 'nurse', 'pharmacist', 'labTechnician'),
        allowNull: false,
        defaultValue: 'doctor',
    },
    profilePic: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    sector: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    gender: {
        type: DataTypes.ENUM('male', 'female'),
        allowNull: true,
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    address: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    city: {
        type: DataTypes.STRING(30),
        allowNull: true,
    },
    country: {
        type: DataTypes.STRING(30),
        allowNull: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },

    certification: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },

    yearsOfExperience: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    aboutMe: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    dateOfBirth: {
        type: DataTypes.DATEONLY,
        allowNull: true,
    },
}, {
    tableName: 'providers',
    updatedAt: false,
});

// Associations
Specialization.hasMany(Provider, {
    foreignKey: 'specializationId',
});
Provider.belongsTo(Specialization, {
    foreignKey: 'specializationId',
});

Department.hasMany(Provider, {
    foreignKey: 'departmentId',
});
Provider.belongsTo(Department, {
    foreignKey: 'departmentId',
});

module.exports = Provider;
