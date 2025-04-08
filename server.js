
const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const multer = require('multer');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// serve static files like logo
app.use(express.static(path.join(__dirname, 'public')));

// serve templates folder as views
app.use(express.static(path.join(__dirname, 'templates')));

// تقديم الواجهة الرئيسية (واجهة تسجيل الدخول مثلاً)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates', 'login.html'));
});

// استقبال تقارير الأعطال
app.post('/submit-report', async (req, res) => {
  const { elevator_id, technician_name, status, notes } = req.body;

  try {
    const query = `
      INSERT INTO reports (elevator_id, technician_name, status, notes)
      VALUES ($1, $2, $3, $4)
    `;
    await pool.query(query, [elevator_id, technician_name, status, notes]);
    res.send('<h3>Report submitted successfully! <a href="/submit_report.html">Submit another</a></h3>');
  } catch (err) {
    console.error('Error saving report:', err);
    res.status(500).send('Error saving report');
  }
});

// Start server
app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
