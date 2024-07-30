const express = require('express');
const axios = require('axios');
const router = express.Router();
require('dotenv').config();

router.post('/sync_students', async (req, res) => {
    try {
        const requestData = {
            user_token: process.env.USER_TOKEN,
            year: 2023,
            promotions: ["tek1"]
        };
        const apiIp = process.env.API_IP;
        const apiUrl = `http://${apiIp}/intra/getStudents`;
        const response = await axios.post(apiUrl, requestData);
        res.status(200).json({
            success: true,
            data: response.data
        });
    } catch (error) {
        console.error('Error syncing data:', error);
        res.status(500).json({ success: false, message: 'Error syncing data' });
    }
});

module.exports = router;
