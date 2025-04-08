const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// إعداد قاعدة البيانات
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

// تعيين مجلد القوالب
app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

// تحويل الصفحة الرئيسية إلى صفحة تسجيل الدخول
app.get('/', (req, res) => {
  res.redirect('/auth/login');
});

// التوجيه الديناميكي لكل الملفات داخل مجلد templates (جميع المجلدات الفرعية)
const folders = ['admin', 'auth', 'reports', 'shared', 'technician'];

folders.forEach(folder => {
  app.get(`/${folder}/:page`, (req, res) => {
    const page = req.params.page;
    const filePath = path.join(__dirname, 'templates', folder, `${page}.html`);
    res.sendFile(filePath);
  });
});

// التحقق من رقم الجوال قبل الدخول
app.post('/verify-phone', async (req, res) => {
  const { phone } = req.body;
  try {
    const result = await pool.query('SELECT role FROM users WHERE phone = $1', [phone]);
    if (result.rows.length > 0) {
      const role = result.rows[0].role;
      if (role === 'admin') {
        res.redirect('/admin/admin_dashboard_ai_tools');
      } else if (role === 'technician') {
        res.redirect('/technician/submit_report_with_form');
      } else {
        res.send('Unauthorized role');
      }
    } else {
      res.send('Please ask the administrator to register your number in the system. Contact: +966542805145 or admin@rk-lifts.com');
    }
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).send('Internal server error');
  }
});

// تشغيل الخادم
app.listen(port, () => {
  console.log(`RKLIFTS APP is running on http://localhost:${port}`);
});
