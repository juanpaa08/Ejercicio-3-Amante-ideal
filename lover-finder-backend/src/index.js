require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const amanteRoutes = require('./routes/amante.routes');
const seedDatabase = require('./seed');

const app = express();
const PORT = process.env.PORT || 3000;

// ── Middleware ──────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ── Routes ─────────────────────────────────────────────
app.use('/amantes', amanteRoutes);

// ── Health check ───────────────────────────────────────
app.get('/', (_req, res) => {
    res.json({ message: '💘 Lover Finder API is running!' });
});

// ── Start server ───────────────────────────────────────
async function start() {
    await connectDB();
    await seedDatabase();

    app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
}

start();
