const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const sequelize = require('../config/database'); // Your Sequelize instance
const db = {};

fs.readdirSync(__dirname + '/models') // Read all model files
    .filter((file) => file.endsWith('.js')) // Only include JS files
    .forEach((file) => {
        const model = require(path.join(__dirname + '/models', file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
    });

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
