const { DataTypes } = require('sequelize');
const sequelize = require('../../db/database');
const Specialization = require('./specializationModel');
const Department = require('./departmentModel');

const Provider = sequelize.define('Provider', {
    fullName: {
        type: DataTypes.STRING,
        allowNull: true,
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
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

    specializationId: {
        type: DataTypes.INTEGER,
        references: {
            model: Specialization,
            key: 'id'
        },

        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },

    departmentId: {
        type: DataTypes.INTEGER,
        references: {
            model: Department,
            key: 'id'
        },

        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },

    sector: {
        type: DataTypes.STRING(100),
        allowNull: true
    },

    gender: {
        type: DataTypes.ENUM('male', 'female'),
        allowNull: true
    },

    age: {
        type: DataTypes.INTEGER,
        allowNull: true
    },

    address: {
        type: DataTypes.STRING,
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    profilePic: {
        type: DataTypes.STRING,
        allowNull: true,
    },

    isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
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
},
    {
        tableName: 'providers',
        updatedAt: false
    });

module.exports = Provider;
