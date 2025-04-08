
const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const multer = require('multer');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// إعداد الاتصال بقاعدة البيانات PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// إعداد ميدلوير
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// ==== توجيه الصفحات ====

const templatesPath = path.join(__dirname, 'templates');

app.get('/', (req, res) => {
  res.sendFile(path.join(templatesPath, 'auth', 'login.html'));
});

app.get('/admin/dashboard', (req, res) => {
  res.sendFile(path.join(templatesPath, 'admin', 'admin_dashboard_ai_tools.html'));
});

app.get('/technician/dashboard', (req, res) => {
  res.sendFile(path.join(templatesPath, 'technician', 'technician_breakdown_maintenance.html'));
});

app.get('/technician/ai-diagnosis', (req, res) => {
  res.sendFile(path.join(templatesPath, 'technician', 'technician_ai_diagnosis.html'));
});

app.get('/technician/fault-report', (req, res) => {
  res.sendFile(path.join(templatesPath, 'technician', 'fault_report_form.html'));
});

app.get('/technician/reports', (req, res) => {
  res.sendFile(path.join(templatesPath, 'reports', 'view_maintenance_reports.html'));
});

app.get('/unauthorized', (req, res) => {
  res.sendFile(path.join(templatesPath, 'auth', '401.html'));
});

app.get('/not-found', (req, res) => {
  res.sendFile(path.join(templatesPath, 'auth', '404.html'));
});

// تسجيل الدخول وتوجيه المستخدم حسب الصلاحية
app.post('/login', async (req, res) => {
  const { phone } = req.body;

  try {
    const result = await pool.query('SELECT role FROM users WHERE phone = $1', [phone]);

    if (result.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Please ask the administrator to register your number in the system. Contact: +966542805145 or admin@rk-lifts.com',
      });
    }

    const user = result.rows[0];
    const role = user.role;

    let redirectPath = '/';
    if (role === 'admin') {
      redirectPath = '/admin/dashboard';
    } else if (role === 'technician') {
      redirectPath = '/technician/dashboard';
    }

    res.json({ success: true, redirect: redirectPath });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// تشغيل السيرفر
app.listen(port, () => {
  console.log(`✅ RK LIFTS APP is running at: http://localhost:${port}`);
});
