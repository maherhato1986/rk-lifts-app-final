const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

console.log('📦 DATABASE_URL =', process.env.DATABASE_URL);

// إعداد قاعدة البيانات
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// إعدادات عامة
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

// الصفحة الرئيسية
app.get('/', (req, res) => {
  res.redirect('/auth/login');
});

// التوجيه لجميع القوالب
const folders = ['admin', 'auth', 'reports', 'shared', 'technician'];
folders.forEach(folder => {
  app.get(`/${folder}/:page`, (req, res) => {
    const page = req.params.page;
    const filePath = path.join(__dirname, 'templates', folder, `${page}.html`);
    res.sendFile(filePath);
  });
});

// ✅ تعديل استجابة التحقق لإرجاع JSON
app.post('/verify-phone', async (req, res) => {
  const { phone } = req.body;
  try {
    const result = await pool.query('SELECT role FROM users WHERE phone = $1', [phone]);
    if (result.rows.length > 0) {
      const role = result.rows[0].role;
      if (role === 'admin') {
        return res.json({ success: true, redirect: '/admin/admin_dashboard_ai_tools' });
      } else if (role === 'technician') {
        return res.json({ success: true, redirect: '/technician/submit_report_with_form' });
      } else {
        return res.json({ success: false, message: 'Unauthorized role' });
      }
    } else {
      return res.json({
        success: false,
        message: 'Please ask the administrator to register your number in the system. Contact: +966542805145 or admin@rk-lifts.com'
      });
    }
  } catch (err) {
    console.error('❌ Database error:', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// تشغيل السيرفر
app.listen(port, () => {
  console.log(`✅ RKLIFTS APP is running on http://localhost:${port}`);
});
