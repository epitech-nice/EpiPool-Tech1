const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Teams = sequelize.define('Team', {
    team_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    color: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

Teams.getStarter = async function() {
    const sql = "SELECT * FROM TEAMS WHERE team_id < 5;";
    const [results, metadata] = await sequelize.query(sql);
    return results;
}

Teams.getOrders = async function() {
    const sql = "SELECT * FROM TEAMS WHERE team_id > 4;";
    const [results, metadata] = await sequelize.query(sql);
    return results;
}

Teams.getAll = async function() {
    const sql = "SELECT * FROM TEAMS;";
    const [results, metadata] = await sequelize.query(sql);
    return results;
}

module.exports = Teams;
