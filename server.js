
const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const path = require('path');
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
app.use(express.static(path.join(__dirname, 'templates')));

// تحويل الصفحة الرئيسية لتسجيل الدخول
app.get('/', (req, res) => {
  res.redirect('/auth/login');
});

app.get('/templates/admin/add_elevator', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates/templates/admin/add_elevator.html'));
});

app.get('/templates/admin/add_project', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates/templates/admin/add_project.html'));
});

app.get('/templates/admin/add_user', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates/templates/admin/add_user.html'));
});

app.get('/templates/admin/admin_dashboard_ai_tools', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates/templates/admin/admin_dashboard_ai_tools.html'));
});

app.get('/templates/admin/ai_smart_dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates/templates/admin/AI_Smart_Dashboard.html'));
});

app.get('/templates/admin/client_account_statements', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates/templates/admin/Client_Account_Statements.html'));
});

app.get('/templates/admin/general_settings', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates/templates/admin/general_settings.html'));
});

app.get('/templates/admin/generate_invoice', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates/templates/admin/generate_invoice.html'));
});

app.get('/templates/admin/generate_quote', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates/templates/admin/generate_quote.html'));
});

app.get('/templates/admin/manage_clients', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates/templates/admin/manage_clients.html'));
});

app.get('/templates/admin/manage_projects', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates/templates/admin/manage_projects.html'));
});

app.get('/templates/admin/manage_technicians', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates/templates/admin/manage_technicians.html'));
});

app.get('/templates/admin/map', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates/templates/admin/map.html'));
});

app.get('/templates/admin/notifications_system', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates/templates/admin/Notifications_System.html'));
});

app.get('/templates/admin/schedule', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates/templates/admin/schedule.html'));
});

app.get('/templates/admin/search_archive', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates/templates/admin/search_archive.html'));
});

app.get('/templates/admin/search_project', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates/templates/admin/search_project.html'));
});

app.get('/templates/auth/401', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates/templates/auth/401.html'));
});

app.get('/templates/auth/404', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates/templates/auth/404.html'));
});

app.get('/templates/auth/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates/templates/auth/login.html'));
});

app.get('/templates/auth/otp_verification', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates/templates/auth/otp_verification.html'));
});

app.get('/templates/auth/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates/templates/auth/register.html'));
});

app.get('/templates/reports/elevator_condition_report', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates/templates/reports/elevator_condition_report.html'));
});

app.get('/templates/reports/report_pdf', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates/templates/reports/report_pdf.html'));
});

app.get('/templates/reports/view_maintenance_reports', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates/templates/reports/view_maintenance_reports.html'));
});

app.get('/templates/shared/assign_technician', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates/templates/shared/Assign_Technician.html'));
});

app.get('/templates/shared/base', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates/templates/shared/base.html'));
});

app.get('/templates/shared/view_client_invoices', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates/templates/shared/View_Client_Invoices.html'));
});

app.get('/templates/technician/chat', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates/templates/technician/chat.html'));
});

app.get('/templates/technician/elevator_logs', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates/templates/technician/elevator_logs.html'));
});

app.get('/templates/technician/fault_report_form', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates/templates/technician/fault_report_form.html'));
});

app.get('/templates/technician/preventive_maintenance', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates/templates/technician/preventive_maintenance.html'));
});

app.get('/templates/technician/submit_report_with_form', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates/templates/technician/submit_report_with_form.html'));
});

app.get('/templates/technician/technician_ai_diagnosis', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates/templates/technician/technician_ai_diagnosis.html'));
});

app.get('/templates/technician/technician_breakdown_maintenance', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates/templates/technician/technician_breakdown_maintenance.html'));
});

app.get('/templates/technician/view_maintenance_reports', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates/templates/technician/view_maintenance_reports.html'));
});
const fs = require('fs');

// توجيه تلقائي لأي ملف HTML داخل مجلد templates والمجلدات الفرعية
app.get('/:folder/:page', (req, res) => {
  const { folder, page } = req.params;
  const filePath = `templates/${folder}/${page}.html`;

  if (fs.existsSync(filePath)) {
    res.sendFile(path.join(__dirname, filePath));
  } else {
    res.status(404).send('Page not found');
  }
});

// توجيه الصفحة الرئيسية إلى تسجيل الدخول
app.get('/', (req, res) => {
  res.redirect('/auth/login');
});

app.listen(port, () => {
  console.log('✅ RK LIFTS APP is running at: http://localhost:' + port);
});
