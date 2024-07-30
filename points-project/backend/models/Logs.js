const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Logs = sequelize.define('Log', {
    log_id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    team_id:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    student_id:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    points:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    event:{
        type: DataTypes.STRING,
        allowNull: false
    },
});

Logs.getAll = async function() {
    const sql = "SELECT * FROM LOGS;";
    const [results, metadata] = await sequelize.query(sql);
    return results;
}

Logs.getByTeam = async function(team_id) {
    const sql = `SELECT * FROM LOGS WHERE team_id = ${team_id};`;
    const [results, metadata] = await sequelize.query(sql);
    return results;
}

Logs.getByStudent = async function(student_id) {
    const sql = `SELECT * FROM LOGS WHERE student_id = ${student_id};`;
    const [results, metadata] = await sequelize.query(sql);
    return results;
}
