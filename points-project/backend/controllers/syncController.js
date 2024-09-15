const axios = require('axios');

exports.syncStudentsFromIntra = async (req, res) => {
    try {
        const requestData = {
            user_token: process.env.USER_TOKEN_API_LIONEL,
            year: 2023,
            promotions: ["tek1"]
        };
        const apiIp = process.env.IP_HUB;
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
};
