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

// تسجيل الدخول
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/templates/auth/login.html');
});

// تحقق OTP (اختياري)
app.get('/otp', (req, res) => {
  res.sendFile(__dirname + '/templates/auth/otp_verification.html');
});

// لوحة المدير
app.get('/admin/dashboard', (req, res) => {
  res.sendFile(__dirname + '/templates/admin/admin_dashboard_ai_tools.html');
});

// لوحة الفني
app.get('/technician/dashboard', (req, res) => {
  res.sendFile(__dirname + '/templates/technician/technician_breakdown_maintenance.html');
});

// صفحة التشخيص الذكي للفني
app.get('/technician/ai-diagnosis', (req, res) => {
  res.sendFile(__dirname + '/templates/technician/technician_ai_diagnosis.html');
});

// رفع تقارير الأعطال (نموذج)
app.get('/technician/fault-report', (req, res) => {
  res.sendFile(__dirname + '/templates/technician/fault_report_form.html');
});

// عرض تقارير الصيانة
app.get('/technician/reports', (req, res) => {
  res.sendFile(__dirname + '/templates/reports/view_maintenance_reports.html');
});

// صفحات خطأ
app.get('/unauthorized', (req, res) => {
  res.sendFile(__dirname + '/templates/auth/401.html');
});

app.get('/not-found', (req, res) => {
  res.sendFile(__dirname + '/templates/auth/404.html');
});

// ===== تسجيل تقرير صيانة (مثال على POST) =====
app.post('/submit-report', async (req, res) => {
  const { elevator_id, technician_name, status, notes } = req.body;

  try {
    const query = `
      INSERT INTO reports (elevator_id, technician_name, status, notes)
      VALUES ($1, $2, $3, $4)
    `;
    await pool.query(query, [elevator_id, technician_name, status, notes]);
    res.send('<h3>تم إرسال التقرير بنجاح! <a href="/technician/fault-report">إرسال تقرير آخر</a></h3>');
  } catch (err) {
    console.error('خطأ في حفظ التقرير:', err);
    res.status(500).send('تعذر حفظ التقرير');
  }
});

// ===== تشغيل السيرفر =====
app.listen(port, () => {
  console.log(`✅ RK LIFTS APP is running at: http://localhost:${port}`);
});
