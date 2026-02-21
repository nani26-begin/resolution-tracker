const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { PrismaClient } = require('@prisma/client');

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'LevelUp 2026 API is running' });
});

// Import routes
const authRoutes = require('./routes/auth');
const resolutionRoutes = require('./routes/resolutions');

app.use('/api/auth', authRoutes);
app.use('/api/resolutions', resolutionRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = { prisma };
