const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Points = sequelize.define('Point', {
    team_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    points: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
});

Points.getAll = async function() {
    const sql = "SELECT * FROM POINTS;";
    const [results, metadata] = await sequelize.query(sql);
    return results;
}

Points.getByTeam = async function(team_id) {
    const sql = `SELECT * FROM POINTS WHERE team_id = ${team_id};`;
    const [results, metadata] = await sequelize.query(sql);
    return results;
}

Points.addPoints = async function(team_id, points) {
    const sql = `UPDATE POINTS SET points = points + ${points} WHERE team_id = ${team_id};`;
    const [results, metadata] = await sequelize.query(sql);
    return results;
}

Points.removePoints = async function(team_id, points) {
    const sql = `UPDATE POINTS SET points = points - ${points} WHERE team_id = ${team_id};`;
    const [results, metadata] = await sequelize.query(sql);
    return results;
}
