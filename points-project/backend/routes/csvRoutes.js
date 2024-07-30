const express = require('express');
const multer = require('multer');
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const upload = multer({ dest: 'uploads/' });

router.post('/upload_csv', upload.single('file'), (req, res) => {
    const filePath = path.join(__dirname, 'uploads', req.file.filename);
    const results = [];

    fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            console.log(results);
            res.json({ success: true, data: results });
            fs.unlink(filePath, (err) => {
                if (err) console.error('Error deleting file:', err);
            });
        })
        .on('error', (error) => {
            console.error('Error reading file:', error);
            res.status(500).json({ success: false, message: 'Error processing file' });
        });
});

module.exports = router;
