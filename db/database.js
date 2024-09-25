const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();
const env = process.env;

// Create a Sequelize instance, connecting to the MySQL database
const sequelize = new Sequelize(env.DB_DATABASE, env.DB_USERNAME, null, {
    host: env.DB_HOST || 'localhost',
    dialect: env.DB_DIALECT || 'mysql'
});

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});

module.exports = sequelize;
