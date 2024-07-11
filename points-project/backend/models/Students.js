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
    }
    //add new column for student_id
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

// Students.addPoints = async function(student_id, points) {
//     const sql = `UPDATE STUDENTS SET points = points + ${points} WHERE student_id = ${student_id};`;
//     const [results, metadata] = await sequelize.query(sql);
//     return results;
// }

// Students.removePoints = async function(student_id, points) {
//     const sql = `UPDATE STUDENTS SET points = points - ${points} WHERE student_id = ${student_id};`;
//     const [results, metadata] = await sequelize.query(sql);
//     return results;
// }