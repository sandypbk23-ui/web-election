const express = require('express');
const cors = require('cors');
const { scrapeElectionData } = require('./scrapers/electionScraper');
const nodeCron = require('node-cron');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const DATA_PATH = path.join(__dirname, 'data', 'election_results.json');

// Ensure data directory exists
if (!fs.existsSync(path.join(__dirname, 'data'))) {
    fs.mkdirSync(path.join(__dirname, 'data'));
}

// Initial data load or placeholder
let currentData = {
    summary: { totalSeats: 275, countedSeats: 0 },
    partyResults: [],
    breakingNews: []
};

// Function to update data
async function updateData() {
    console.log('Updating election data...');
    const data = await scrapeElectionData();
    if (data) {
        currentData = data;
        fs.writeFileSync(DATA_PATH, JSON.stringify(currentData, null, 2));
        console.log('Data updated successfully');
    }
}

// Schedule updates every 5 minutes
nodeCron.schedule('*/5 * * * *', updateData);

// API Endpoints
app.get('/api/results', (req, res) => {
    res.json(currentData);
});

app.get('/api/news', (req, res) => {
    res.json(currentData.breakingNews);
});

app.get('/api/status', (req, res) => {
    res.json({ status: 'live', lastUpdate: currentData.summary.updatedAt });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    updateData(); // Run initial update
});
