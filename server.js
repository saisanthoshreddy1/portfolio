// server.js — Express backend for the portfolio
// Raw SQL via pg Pool — no ORM, no Drizzle, no Prisma

const express = require('express');
const cors    = require('cors');
const path    = require('path');
require('dotenv').config();

const pool = require('./db');

const app  = express();
const PORT = process.env.PORT || 3000;

// ─── Middleware ────────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// Serve everything in /public as static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));


// ─── API: GET /api/projects ────────────────────────────────────────────────────
// Returns all projects ordered by newest first
app.get('/api/projects', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM projects ORDER BY created_at DESC'
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching projects:', err.message);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});


// ─── API: GET /api/skills ──────────────────────────────────────────────────────
// Returns all skills ordered by category
app.get('/api/skills', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM skills ORDER BY category, name'
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching skills:', err.message);
    res.status(500).json({ error: 'Failed to fetch skills' });
  }
});


// ─── API: POST /api/contact ────────────────────────────────────────────────────
// Inserts a new contact message into the database
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;

  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    await pool.query(
      'INSERT INTO contact_messages (name, email, message) VALUES ($1, $2, $3)',
      [name, email, message]
    );
    res.status(201).json({ success: true, message: 'Message received! I\'ll be in touch soon.' });
  } catch (err) {
    console.error('Error saving contact message:', err.message);
    res.status(500).json({ error: 'Failed to save message. Please try again.' });
  }
});


// ─── Catch-all: Serve index.html for any unknown route ────────────────────────
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


// ─── Start Server ──────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 Portfolio server running at http://localhost:${PORT}`);
});
