const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('EpiPool-Points', 'user', 'password', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;
