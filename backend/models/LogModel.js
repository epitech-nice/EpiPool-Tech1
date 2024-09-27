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
    reason:{
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'LOGS',
    timestamps: true
});

Logs.getAll = async function() {
    const sql = `SELECT LOGS.*, STUDENTS.name AS student_name, STUDENTS.email, TEAMS.name AS team_name
                FROM LOGS
                LEFT JOIN STUDENTS ON STUDENTS.student_id = LOGS.student_id
                LEFT JOIN TEAMS ON TEAMS.team_id = LOGS.team_id
                ORDER BY LOGS.log_id DESC;`;
    const [results, metadata] = await sequelize.query(sql);
    return results;
}

Logs.getByTeam = async function(team_id) {
    const sql = `SELECT LOGS.*, STUDENTS.name AS student_name, STUDENTS.email, TEAMS.name AS team_name
                FROM LOGS
                LEFT JOIN STUDENTS ON STUDENTS.student_id = LOGS.student_id
                LEFT JOIN TEAMS ON TEAMS.team_id = LOGS.team_id
                WHERE LOGS.team_id = ${team_id}
                ORDER BY LOGS.log_id DESC;`;
    const [results, metadata] = await sequelize.query(sql);
    return results;
}

Logs.getByStudent = async function(student_id) {
    const sql = `SELECT * FROM LOGS WHERE student_id = ${student_id};`;
    const [results, metadata] = await sequelize.query(sql);
    return results;
}

Logs.addLog = async function(team_id, student_id, points, event) {
    const sql = `INSERT INTO LOGS (team_id, student_id, points, reason) VALUES (${team_id}, ${student_id}, ${points}, '${event}');`;
    const [results, metadata] = await sequelize.query(sql);
    return results;
}

Logs.deleteLog = async function(log_id) {
    const sql = `DELETE FROM LOGS WHERE log_id = ${log_id};`;
    const [results, metadata] = await sequelize.query(sql);
    return results;
}

module.exports = Logs;