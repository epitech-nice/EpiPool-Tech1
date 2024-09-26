const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Team = sequelize.define('Team', {
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
    },
    image_name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    points: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    }
}, {
    tableName: 'TEAMS',
    timestamps: false,
});

Team.getByName = async function(name) {
    try {
        const sql = `SELECT * FROM TEAMS WHERE name = '${name}';`;
        const [results, metadata] = await sequelize.query(sql);
        console.log("results GET BYNAME", results);
        return results;
    } catch (error) {
        console.error('Error fetching team by name:', error.message);
        throw new Error('Could not fetch team by name');
    }
}

Team.getStarter = async function() {
    try {
        const sql = "SELECT * FROM TEAMS WHERE team_id < 5;";
        const [results, metadata] = await sequelize.query(sql);
        return results;
    } catch (error) {
        console.error('Error fetching starter teams:', error.message);
        throw new Error('Could not fetch starter teams');
    }
}

Team.getFactions = async function() {
    try {
        const sql = "SELECT * FROM TEAMS WHERE team_id > 4;";
        const [results, metadata] = await sequelize.query(sql);
        return results;
    } catch (error) {
        console.error('Error fetching faction teams:', error.message);
        throw new Error('Could not fetch faction teams');
    }
}

Team.getAll = async function() {
    try {
        const sql = "SELECT * FROM TEAMS;";
        const [results, metadata] = await sequelize.query(sql);
        return results;
    } catch (error) {
        console.error('Error fetching all teams:', error.message);
        throw new Error('Could not fetch all teams');
    }
}

Team.deleteTeam = async function(team_id) {
    const sql = `DELETE FROM TEAMS WHERE team_id = ${team_id};`;
    const [results, metadata] = await sequelize.query(sql);
    if (metadata.affectedRows === 0) {
        throw new Error('Team not found');
    }
    return results;
}

Team.addTeam = async function(name, color, points = 0) {
    try {
        console.log("Adding team:", name, color);

        const existingTeam = await Team.getByName(name);
        console.log("existingTeam", existingTeam);
        if (existingTeam.length > 0) {
            throw new Error('Team with this name already exists');
        }

        const sql = `INSERT INTO TEAMS (name, color, points) VALUES ('${name}', '${color}', '${points}');`;
        const [results, metadata] = await sequelize.query(sql);
        console.log("results", results);
        return results;
    } catch (error) {
        console.error("Error adding team:", error.message);
        throw error;
    }
};

Team.changeTeam = async function(team_id, name, color) {
    const sql = `UPDATE TEAMS SET name = '${name}', color = '${color}' WHERE team_id = ${team_id};`;
    const [results, metadata] = await sequelize.query(sql);
    if (metadata.affectedRows === 0) {
        throw new Error('Team not found');
    }
    return results;
}

module.exports = Team;
