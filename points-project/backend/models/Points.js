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
    try {
        const sql = "SELECT * FROM POINTS;";
        const [results, metadata] = await sequelize.query(sql);
        return results;
        //TODO prorata la
    } catch (error) {
        console.error("Error fetching all points:", error);
        throw new Error("Could not fetch points");
    }
}

Points.getByTeam = async function(team_id) {
    try {
        const sql = `SELECT * FROM POINTS WHERE team_id = ${team_id};`;
        const [results, metadata] = await sequelize.query(sql);
        return results;
        //TODO prorata la
    } catch (error) {
        console.error(`Error fetching points for team ${team_id}:`, error);
        throw new Error("Could not fetch team points");
    }
}

Points.addPoints = async function(team_id, points, reason) {
    try {
        if (points < 0) {
            throw new Error("Points to add must be a positive number");
        }
        const sql = `UPDATE POINTS SET points = points + ${points} WHERE team_id = ${team_id};`;
        const [results, metadata] = await sequelize.query(sql);
        await sequelize.query(`INSERT INTO LOGS (team_id, points, reason) VALUES (${team_id}, ${points}, '${reason}');`);
        return results;
    } catch (error) {
        console.error(`Error adding points to team ${team_id}:`, error);
        throw new Error("Could not add points to team");
    }
}

Points.removePoints = async function(team_id, points, reason) {
    try {
        if (points < 0) {
            throw new Error("Points to remove must be a positive number");
        }
        const pointsSql = `SELECT points FROM POINTS WHERE team_id = ?;`;
        const [currentPointsRes] = await sequelize.query(pointsSql, {
            replacements: [team_id],
            type: sequelize.QueryTypes.SELECT
        });
        if (currentPointsRes.length === 0) {
            throw new Error(`Team with ID ${team_id} not found`);
        }
        const currentPoints = currentPointsRes[0].points;
        if (currentPoints - points < 0) {
            throw new Error("Insufficient points to remove");
        }
        const updateSql = `UPDATE POINTS SET points = points - ? WHERE team_id = ?;`;
        await sequelize.query(updateSql, {
            replacements: [points, team_id],
            type: sequelize.QueryTypes.UPDATE
        });
        await sequelize.query(`INSERT INTO LOGS (team_id, points, reason) VALUES (${team_id}, ${points}, '${reason}');`);
        return { team_id, pointsRemoved: points };
    } catch (error) {
        console.error(`Error removing points from team ${team_id}:`, error.message);
        throw new Error("Failed to remove points from team");
    }
}

module.exports = Points;
