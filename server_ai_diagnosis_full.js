
const express = require('express');
const multer = require('multer');
const path = require('path');
const { Pool } = require('pg');
const fs = require('fs');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// إعداد قاعدة البيانات
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// إعداد رفع الصور
const upload = multer({ dest: 'uploads/' });
app.use('/uploads', express.static('uploads'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// استقبال استفسار عطل وحفظه مع الرد
app.post('/ai-diagnose', upload.single('image'), async (req, res) => {
  const { elevator_id, question } = req.body;
  const image = req.file;

  if (!elevator_id || !question) {
    return res.status(400).json({ response: "Missing elevator ID or question." });
  }

  // رد افتراضي من الذكاء الاصطناعي (محاكي حالياً)
  const ai_response = `Based on the issue described, please check the door sensors, controller relays, and ensure there is no obstruction in the shaft.`;

  let image_url = null;
  if (image) {
    image_url = `/uploads/${image.filename}`;
  }

  try {
    await pool.query(
      'INSERT INTO ai_diagnosis (elevator_id, question, ai_response, image_url) VALUES ($1, $2, $3, $4)',
      [elevator_id, question, ai_response, image_url]
    );

    res.json({ response: ai_response });
  } catch (err) {
    console.error('Error saving AI diagnosis:', err);
    res.status(500).json({ response: "Server error occurred." });
  }
});

// جلب سجل الأعطال السابقة
app.get('/ai-diagnosis-history', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, elevator_id, question, ai_response, image_url, created_at FROM ai_diagnosis ORDER BY created_at DESC LIMIT 50'
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching history:', err);
    res.status(500).json({ error: "Error fetching history" });
  }
});

app.listen(port, () => {
  console.log(`AI Diagnosis server running on http://localhost:${port}`);
});
