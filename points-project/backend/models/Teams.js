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
    try {
        const sql = "SELECT * FROM TEAMS WHERE team_id < 5;";
        const [results, metadata] = await sequelize.query(sql);
        return results;
    } catch (error) {
        console.error('Error fetching starter teams:', error.message);
        throw new Error('Could not fetch starter teams');
    }
}

Teams.getFactions = async function() {
    try {
        const sql = "SELECT * FROM TEAMS WHERE team_id > 4;";
        const [results, metadata] = await sequelize.query(sql);
        return results;
    } catch (error) {
        console.error('Error fetching faction teams:', error.message);
        throw new Error('Could not fetch faction teams');
    }
}

Teams.getAll = async function() {
    try {
        const sql = "SELECT * FROM TEAMS;";
        const [results, metadata] = await sequelize.query(sql);
        return results;
    } catch (error) {
        console.error('Error fetching all teams:', error.message);
        throw new Error('Could not fetch all teams');
    }
}

Teams.deleteTeam = async function(team_id) {
    const sql = `DELETE FROM TEAMS WHERE team_id = ${team_id};`;
    const [results, metadata] = await sequelize.query(sql);
    if (metadata.affectedRows === 0) {
        throw new Error('Team not found');
    }
    return results;
}

Teams.addTeam = async function(name, color) {
    try {
        const existingTeamSql = `SELECT * FROM TEAMS WHERE name = ?`;
        const [existingTeams] = await sequelize.query(existingTeamSql, {
            replacements: [name],
            type: sequelize.QueryTypes.SELECT,
        });
        if (existingTeams.length > 0) {
            throw new Error('Team with this name already exists');
        }
        const insertTeamSql = `INSERT INTO TEAMS (name, color) VALUES (?, ?)`;
        const [results] = await sequelize.query(insertTeamSql, {
            replacements: [name, color],
            type: sequelize.QueryTypes.INSERT,
        });
        return results;
    } catch (error) {
        throw error;
    }
};


Teams.changeTeam = async function(team_id, name, color) {
    const sql = `UPDATE TEAMS SET name = '${name}', color = '${color}' WHERE team_id = ${team_id};`;
    const [results, metadata] = await sequelize.query(sql);
    if (metadata.affectedRows === 0) {
        throw new Error('Team not found');
    }
    return results;
}

module.exports = Teams;
