const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Button = sequelize.define('Button', {
    label: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Button;
