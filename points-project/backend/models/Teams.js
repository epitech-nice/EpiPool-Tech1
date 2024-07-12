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

Teams.getFactions = async function() {
    const sql = "SELECT * FROM TEAMS WHERE team_id > 4;";
    const [results, metadata] = await sequelize.query(sql);
    return results;
}

Teams.getAll = async function() {
    const sql = "SELECT * FROM TEAMS;";
    const [results, metadata] = await sequelize.query(sql);
    return results;
}

Teams.deleteTeam = async function(team_id) {
    const sql = `DELETE FROM TEAMS WHERE team_id = ${team_id};`;
    const [results, metadata] = await sequelize.query(sql);
    return results;
}

Teams.addTeam = async function(name, color) {
    const sql = `INSERT INTO TEAMS (name, color) VALUES ('${name}', '${color}');`;
    const [results, metadata] = await sequelize.query(sql);
    return results;
}

Teams.changeTeam = async function(team_id, name, color) {
    const sql = `UPDATE TEAMS SET name = '${name}', color = '${color}' WHERE team_id = ${team_id};`;
    const [results, metadata] = await sequelize.query(sql);
    return results;
}

module.exports = Teams;
