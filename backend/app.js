// app.js

const express = require('express');
const pm2 = require('pm2');

const app = express();
const PORT = 3100;

console.log('Starting server...');
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.use(express.json());

// Define route handler for root URL
app.get('/', (req, res) => {
    res.send('Welcome to PM2 Control Panel');
});

// Start PM2 service
app.post('/startFoundry', (req, res) => {
    pm2.connect((err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error connecting to PM2');
        }

        pm2.start('foundry', (err, apps) => { // Use 'foundry' instead of 'app.js'
            if (err) {
                console.error(err);
                pm2.disconnect();
                return res.status(500).send('Error starting PM2 service');
            }

            pm2.disconnect();
            return res.send('PM2 service started successfully');
        });
    });
});

// Stop PM2 service
app.post('/stopFoundry', (req, res) => {
    pm2.connect((err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error connecting to PM2');
        }

        pm2.stop('foundry', (err) => { // Use 'foundry' instead of 'app'
            if (err) {
                console.error(err);
                pm2.disconnect();
                return res.status(500).send('Error stopping PM2 service');
            }

            pm2.disconnect();
            return res.send('PM2 service stopped successfully');
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});