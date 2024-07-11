const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Button = sequelize.define('Button', {
    label: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

// Button.getAllButtons = async function() {
//     const sql = "SELECT * FROM Buttons;";
//     const results = await sequelize.query(sql);
//     return results;
// };

module.exports = Button;
