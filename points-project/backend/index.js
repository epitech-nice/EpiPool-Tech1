const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get('/api/buttons', (req, res) => {
    const buttons = [
        { id: 1, label: 'Button 1' },
        { id: 2, label: 'Button 2' },
        { id: 3, label: 'Button 3' },
    ];
    res.json(buttons);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
