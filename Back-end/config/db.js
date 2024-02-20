// src/config/database.js
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    'ProjeDB', 
    'postgres', 
    'sevde200142',
  {
    host: 'localhost',
    dialect: 'postgres',
    port: 5432
  }
);

module.exports = sequelize;