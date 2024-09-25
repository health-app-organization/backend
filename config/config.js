const dotenv = require('dotenv');
dotenv.config();
const env = process.env;

module.exports = {
  development: {
    username: env.DB_USERNAME,
    password: null,
    database: env.DB_DATABASE,
    host: env.DB_HOST || "127.0.0.1",
    dialect: env.DB_DIALECT || "mysql"
  },
  test: {
    username: env.DB_USERNAME,
    password: null,
    database: env.DB_DATABASE,
    host: env.DB_HOST || "127.0.0.1",
    dialect: env.DB_DIALECT || "mysql"
  },
  production: {
    username: env.DB_USERNAME,
    password: null,
    database: env.DB_DATABASE,
    host: env.DB_HOST || "127.0.0.1",
    dialect: env.DB_DIALECT || "mysql"
  }
};