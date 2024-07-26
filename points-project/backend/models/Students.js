const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

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

Students.getByTeam = async function(team_id) {
    const sql = `SELECT * FROM STUDENTS WHERE team_id = ${team_id};`;
    const [results, metadata] = await sequelize.query(sql);
    return results;
}

Students.addPoints = async function(student_id, points) {
    const sql = `UPDATE STUDENTS SET points = points + ${points} WHERE student_id = ${student_id};`;
    const [results, metadata] = await sequelize.query(sql);
    return results;
}

Students.removePoints = async function(student_id, points) {
    const sql = `UPDATE STUDENTS SET points = points - ${points} WHERE student_id = ${student_id};`;
    const [results, metadata] = await sequelize.query(sql);
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
    return results;
}

module.exports = Students;

//get Students API LIONEL
//qd on init //soit csv //soit db + //trucs de test