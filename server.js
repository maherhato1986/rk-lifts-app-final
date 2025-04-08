const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const multer = require('multer');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

// 🟢 التوجيه الافتراضي للصفحة الرئيسية
app.get('/', (req, res) => {
  res.redirect('/auth/login');
});

// 🟢 التوجيه التلقائي لجميع ملفات HTML داخل templates والمجلدات الفرعية
app.get('/:folder/:page', (req, res) => {
  const { folder, page } = req.params;
  const filePath = path.join(__dirname, 'templates', folder, `${page}.html`);

  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).send('Page not found');
  }
});
