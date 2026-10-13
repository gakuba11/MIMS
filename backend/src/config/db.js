const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    dialectOptions: {
      connectTimeout: 3000,
    },
    pool: {
      max: 2,
      min: 0,
      acquire: 3000,
      idle: 10000,
    },
  }
);

module.exports = sequelize;
module.exports.default = sequelize;