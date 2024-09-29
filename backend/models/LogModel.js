const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Logs = sequelize.define('Log', {
    log_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    team_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    student_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    points: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    reason: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    }
}, {
    tableName: 'LOGS',
    timestamps: true,
    updatedAt: false
});

Logs.getAll = async function() {
    const sql = `SELECT LOGS.*, STUDENTS.name AS student_name, STUDENTS.email, TEAMS.name AS team_name, USERS.name AS user_name, USERS.email AS user_email
                FROM LOGS
                LEFT JOIN STUDENTS ON STUDENTS.student_id = LOGS.student_id
                LEFT JOIN TEAMS ON TEAMS.team_id = LOGS.team_id
                LEFT JOIN USERS ON USERS.id = LOGS.user_id
                ORDER BY LOGS.log_id DESC;`;
    const [results, metadata] = await sequelize.query(sql);
    return results;
}

Logs.getByTeam = async function(team_id) {
    const sql = `SELECT LOGS.*, STUDENTS.name AS student_name, STUDENTS.email, TEAMS.name AS team_name, USERS.name AS user_name, USERS.email AS user_email
                FROM LOGS
                LEFT JOIN STUDENTS ON STUDENTS.student_id = LOGS.student_id
                LEFT JOIN TEAMS ON TEAMS.team_id = LOGS.team_id
                LEFT JOIN USERS ON USERS.id = LOGS.user_id
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

Logs.addLog = async function(team_id, student_id, points, event, user_id) {
    const sql = `INSERT INTO LOGS (team_id, student_id, points, reason, user_id) 
                 VALUES (${team_id}, ${student_id}, ${points}, '${event}', ${user_id});`;
    const [results, metadata] = await sequelize.query(sql);
    return results;
};

Logs.deleteLog = async function(log_id) {
    const sql = `DELETE FROM LOGS WHERE log_id = ${log_id};`;
    const [results, metadata] = await sequelize.query(sql);
    return results;
}

module.exports = Logs;