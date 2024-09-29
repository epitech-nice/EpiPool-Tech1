const { exec } = require('child_process');
const path = require('path');

exports.runPythonScript = (req, res) => {
    const scriptPath = path.join(__dirname, '../scripts/script.py');

    exec(`python3 ${scriptPath}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Erreur lors de l'exécution du script Python: ${error.message}`);
            return res.status(500).json({ error: error.message });
        }
        if (stderr) {
            console.error(`Erreur dans le script Python: ${stderr}`);
            return res.status(500).json({ error: stderr });
        }

        console.log(`Résultat du script Python: ${stdout}`);
        res.status(200).json({ message: 'Script Python exécuté avec succès', output: stdout });
    });
};
