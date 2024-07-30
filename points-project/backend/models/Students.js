const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Points = require('./Points');

const Students = sequelize.define('Student', {
    team_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    points: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    student_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

Students.getAll = async function() {
    const sql = "SELECT * FROM STUDENTS;";
    const [results, metadata] = await sequelize.query(sql);
    return results;
}

Students.getStudent = async function(student_id) {
    const sql = `SELECT * FROM STUDENTS WHERE student_id = ${student_id};`;
    const [results, metadata] = await sequelize.query(sql);
    return results;
}

Students.getByTeam = async function(team_id) {
    const sql = `SELECT * FROM STUDENTS WHERE team_id = ${team_id};`;
    const [results, metadata] = await sequelize.query(sql);
    return results;
}

Students.addPoints = async function(student_id, points, reason) {
    if (points < 0)
        throw new Error("Points to add must be a positive number");
    const sql = `UPDATE STUDENTS SET points = points + ${points} WHERE student_id = ${student_id};`;
    const [results, metadata] = await sequelize.query(sql);
    await sequelize.query(`INSERT INTO LOGS (student_id, points, reason) VALUES (${student_id}, ${points}, '${reason}');`);
    await sequelize.query(`
        UPDATE POINTS
        SET points = points + ?
        WHERE team_id = (SELECT team_id FROM STUDENTS WHERE student_id = ?);
    `, {
        replacements: [points, student_id],
        type: sequelize.QueryTypes.UPDATE
    });    
    return results;
}

Students.removePoints = async function(student_id, points, reason) {
    if (points < 0)
        throw new Error("Points to remove must be a positive number");
    const [datas, met] = await sequelize.query(`SELECT points FROM STUDENTS WHERE student_id = ${student_id};`);
    current_points = datas[0].points;
    if (points > current_points) {
        points_to_rm = points - current_points;
        points = points - points_to_rm;
    }
    const sql = `UPDATE STUDENTS SET points = points - ${points} WHERE student_id = ${student_id};`;
    const [results, metadata] = await sequelize.query(sql);
    points_log = points * -1;
    await sequelize.query(`INSERT INTO LOGS (student_id, points, reason) VALUES (${student_id}, ${points_log}, '${reason}');`);
    const [data, meta] = await sequelize.query(`SELECT team_id FROM STUDENTS WHERE student_id = ${student_id};`);
    team_id = data[0].team_id;
    Points.removePoints(team_id, points, reason);
    return results;
}

Students.addStudent = async function(name, email, points) {
    const sql = `INSERT INTO STUDENTS (name, email, points) VALUES ('${name}', '${email}', ${points});`;
    const [results, metadata] = await sequelize.query(sql);
    return results;
}

Students.changeStudent = async function(student_id, name, email, points) {
    const sql = `UPDATE STUDENTS SET name = '${name}', email = '${email}', points = ${points} WHERE student_id = ${student_id};`;
    const [results, metadata] = await sequelize.query(sql);
    return results;
}

Students.deleteStudent = async function(student_id) {
    const sql = `DELETE FROM STUDENTS WHERE student_id = ${student_id};`;
    const [results, metadata] = await sequelize.query(sql);
    if (metadata.affectedRows === 0)
        throw new Error("Student not found");
    return results;
}

module.exports = Students;

//get Students API LIONEL
//qd on init //soit csv //soit db + //trucs de test