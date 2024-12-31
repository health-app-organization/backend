const { DataTypes } = require("sequelize");
const sequelize = require('../../db/database');
const User = require("../users/userModel");

const NotificationSubscription = sequelize.define("NotificationSubscription", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    type: {
        type: DataTypes.ENUM("web", "mobile"),
        allowNull: false,
    },

    subscription: {
        type: DataTypes.TEXT,
        allowNull: true,
    },

    deviceToken: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});

User.hasMany(NotificationSubscription, {
    foreignKey: "userId",
    onDelete: "CASCADE",
})

NotificationSubscription.belongsTo(User, {
    foreignKey: "userId",
    onDelete: "CASCADE",
})

module.exports = NotificationSubscription;
