// config/Database1.js
const { Sequelize } = require('sequelize');

const db = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'mysql', // atau 'postgres', 'sqlite', 'mariadb', 'mssql'
});

module.exports = db;
