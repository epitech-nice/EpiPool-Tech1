const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Team = require('./TeamModel');

const Students = sequelize.define('Student', {
    team_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    points: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    student_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    }
}, {
    tableName: 'STUDENTS',
    timestamps: false,
    charset: 'utf8mb4',
    collate: 'utf8mb4_0900_ai_ci'
});

Students.getAll = async function() {
    const sql = "SELECT STUDENTS.*, TEAMS.name as team_name FROM STUDENTS LEFT JOIN TEAMS ON TEAMS.team_id = STUDENTS.team_id;";
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

Students.addPoints = async function(student_id, points, reason, user_id) {
    if (points === null || points === undefined || points < 0)
        throw new Error("Points to add must be a positive number");

    const updateSql = `UPDATE STUDENTS SET points = points + :points WHERE student_id = :student_id;`;
    await sequelize.query(updateSql, {
        replacements: { points, student_id }
    });

    const selectSql = `SELECT team_id FROM STUDENTS WHERE student_id = :student_id;`;
    const [data] = await sequelize.query(selectSql, {
        replacements: { student_id }
    });

    const team_id = data[0]?.team_id;
    if (!team_id) {
        throw new Error("Team not found for this student");
    }

    const insertLogSql = `INSERT INTO LOGS (team_id, student_id, points, reason, user_id) 
                          VALUES (:team_id, :student_id, :points, :reason, :user_id);`;
    await sequelize.query(insertLogSql, {
        replacements: { team_id, student_id, points, reason, user_id }
    });

    const team = await Team.findByPk(team_id);
    if (!team) {
        throw new Error("Team not found");
    }

    team.points += points;
    await team.save();

    return { success: true };
};


Students.removePoints = async function(student_id, points, reason, user_id) {
    if (points === null || points === undefined || points < 0)
        throw new Error("Points to remove must be a positive number");
    const [datas] = await sequelize.query(`SELECT points FROM STUDENTS WHERE student_id = :student_id;`, {
        replacements: { student_id }
    });

    const current_points = datas[0]?.points;
    if (!current_points) {
        throw new Error("Student not found or has no points");
    }
    let points_to_rm = points;
    if (points > current_points) {
        points_to_rm = current_points;
    }
    const updateSql = `UPDATE STUDENTS SET points = points - :points_to_rm WHERE student_id = :student_id;`;
    await sequelize.query(updateSql, {
        replacements: { points_to_rm, student_id }
    });
    const selectSql = `SELECT team_id FROM STUDENTS WHERE student_id = :student_id;`;
    const [data] = await sequelize.query(selectSql, {
        replacements: { student_id }
    });
    const team_id = data[0]?.team_id;
    if (!team_id) {
        throw new Error("Team not found for this student");
    }
    const points_log = points_to_rm * -1;
    const insertLogSql = `INSERT INTO LOGS (team_id, student_id, points, reason, user_id) 
                          VALUES (:team_id, :student_id, :points_log, :reason, :user_id);`;
    await sequelize.query(insertLogSql, {
        replacements: { team_id, student_id, points_log, reason, user_id }
    });
    const team = await Team.findByPk(team_id);
    if (!team) {
        throw new Error("Team not found");
    }
    team.points -= points_to_rm;
    await team.save();
    return { success: true };
};


Students.addStudent = async function(name, email, points, team_id = null) {
    if (points < 0)
        points = 0;
    const sql = `INSERT INTO STUDENTS (name, email, points, team_id) VALUES ('${name}', '${email}', ${points}, ${team_id});`;
    const [results, metadata] = await sequelize.query(sql);
    return results;
}

Students.changeStudent = async function(student_id, name, email, points) {
    const sql = `UPDATE STUDENTS SET name = '${name}', email = '${email}', points = ${points} WHERE student_id = ${student_id};`;
    const [results, metadata] = await sequelize.query(sql);
    return results;
}

Students.deleteStudent = async function(student_id) {
    const sql = `DELETE FROM STUDENTS WHERE student_id = :student_id;`;
    const [results, metadata] = await sequelize.query(sql, {
        replacements: { student_id },
    });
    if (metadata.affectedRows === 0)
        throw new Error("Student not found");
    return results;
};

Students.getChampionByTeam = async function(team_id) {
    const sql = `SELECT * FROM STUDENTS WHERE team_id = ${team_id} ORDER BY points DESC LIMIT 1;`;
    const [results, metadata] = await sequelize.query(sql);
    return results;
}

Students.changeTeam = async function(student_id, team_id) {
    const sql = `UPDATE STUDENTS SET team_id = ${team_id} WHERE student_id = ${student_id};`;
    const [results, metadata] = await sequelize.query(sql);
    return results;
}

Students.getStudentByEmail = async function(email) {
    const sql = `SELECT * FROM STUDENTS WHERE email = '${email}';`;
    const [results, metadata] = await sequelize.query(sql);
    return results;
}

Students.updatePoints = async function(student_id, points, reason, operation = 'add') {
    try {
        const [data] = await sequelize.query(`SELECT points, team_id FROM STUDENTS WHERE student_id = :student_id`, {
            replacements: { student_id }
        });

        if (!data[0]) {
            throw new Error("Student not found");
        }

        let current_points = data[0].points;
        const team_id = data[0].team_id;

        let new_points = operation === 'add' ? current_points + points : current_points - points;
        new_points = new_points < 0 ? 0 : new_points;

        const updateSql = `UPDATE STUDENTS SET points = :new_points WHERE student_id = :student_id;`;
        await sequelize.query(updateSql, {
            replacements: { new_points, student_id }
        });

        const points_log = operation === 'add' ? points : -points;
        const insertLogSql = `INSERT INTO LOGS (team_id, student_id, points, reason) VALUES (:team_id, :student_id, :points_log, :reason);`;
        await sequelize.query(insertLogSql, {
            replacements: { team_id, student_id, points_log, reason }
        });

        if (team_id) {
            await Team.updatePoints(team_id, points_log, reason, operation);
        }

        return { success: true, new_points };
    } catch (error) {
        console.error("Error updating student points:", error.message);
        throw error;
    }
};

module.exports = Students;
