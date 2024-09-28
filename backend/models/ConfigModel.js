const sequelize = require('../config/database');

const isRandomTeamUsed = async function() {
    try {
        const [results] = await sequelize.query('SELECT random_config FROM CONFIG LIMIT 1');
        return results[0].random_config === 1;
    } catch (error) {
        console.error('Error fetching config:', error.message);
        throw error;
    }
};

const setRandomTeamUsed = async function() {
    try {
        await sequelize.query('UPDATE CONFIG SET random_config = 1');
    } catch (error) {
        console.error('Error updating config:', error.message);
        throw error;
    }
};

module.exports = {
    isRandomTeamUsed,
    setRandomTeamUsed
};
