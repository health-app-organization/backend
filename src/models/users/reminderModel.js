const { DataTypes } = require('sequelize');
const sequelize = require('../../db/database');
const Medicine = require('./medicineModel');

const Reminder = sequelize.define('Reminder', {
    time: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            isDate: {
                msg: 'Invalid date format'
            },
            setFutureOneoffDate() {
                if (this.recurrence === 'oneoff' && this.time <= new Date()) {
                    throw new Error('One-off reminder date must be in the future');
                }
            }
        }
    },

    status: {
        type: DataTypes.ENUM('ongoing', 'cancelled'),
        allowNull: true
    },

    recurrence: {
        type: DataTypes.ENUM('daily', 'oneoff'),
        allowNull: false,
        defaultValue: 'oneoff',
    }


}, {
    tableName: 'reminders',
    updatedAt: false,
});

// Associations
Medicine.hasMany(Reminder, {
    as: 'reminders',
    foreignKey: 'medicineId',
    onDelete: 'CASCADE'
});

Reminder.belongsTo(Medicine, {
    foreignKey: 'medicineId',
    as: "medicine",
    onDelete: 'CASCADE'
});

module.exports = Reminder;
