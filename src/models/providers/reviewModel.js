const { DataTypes } = require('sequelize');
const sequelize = require('../../db/database');
const Provider = require('./providerModel');
const User = require('../users/userModel');

const Review = sequelize.define('Review',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        review: {
            type: DataTypes.STRING(500),
            allowNull: false
        },

        rating: {
            type: DataTypes.TINYINT,
            allowNull: false
        },

        isFavorite: {
            type: DataTypes.BOOLEAN,
            allowNull: false,

        },

    })

User.hasMany(Review, { foreignKey: 'userId' });
Provider.hasMany(Review, { foreignKey: 'providerId' });

Review.belongsTo(User, { foreignKey: 'userId' });
Review.belongsTo(Provider, { foreignKey: 'providerId' });


module.exports = Review;