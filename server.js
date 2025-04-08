
const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// إعداد الاتصال بقاعدة البيانات
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

// إعداد الواجهات
const basePath = path.join(__dirname, 'templates');

app.get('/', (req, res) => {
  res.sendFile(path.join(basePath, 'auth', 'login.html'));
});

app.get('/admin/dashboard', (req, res) => {
  res.sendFile(path.join(basePath, 'admin', 'admin_dashboard_ai_tools.html'));
});

app.get('/technician/dashboard', (req, res) => {
  res.sendFile(path.join(basePath, 'technician', 'technician_dashboard.html'));
});

app.get('/ai-diagnose', (req, res) => {
  res.sendFile(path.join(basePath, 'technician', 'technician_ai_diagnosis.html'));
});

app.get('/submit-report', (req, res) => {
  res.sendFile(path.join(basePath, 'technician', 'submit_report_with_form.html'));
});

app.get('/view-reports', (req, res) => {
  res.sendFile(path.join(basePath, 'reports', 'view_maintenance_reports.html'));
});

app.get('/report/pdf', (req, res) => {
  res.sendFile(path.join(basePath, 'reports', 'report_pdf.html'));
});

// صفحة غير موجودة
app.use((req, res) => {
  res.status(404).sendFile(path.join(basePath, 'auth', '404.html'));
});

app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
