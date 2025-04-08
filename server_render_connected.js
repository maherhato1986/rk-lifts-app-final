
// في أعلى الملف:
const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const multer = require('multer'); // ← تأكد من وجودها
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// ربط قاعدة البيانات باستخدام Environment Variable DATABASE_URL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.set('view engine', 'html');

// استقبال بيانات تقرير الفني
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

// تشغيل السيرفر
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
