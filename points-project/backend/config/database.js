const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('EpiPool-DB', 'user', 'password', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;
