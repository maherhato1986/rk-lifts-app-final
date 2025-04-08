
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

app.get('/admin/add_elevator', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates/admin/add_elevator.html'));
});

app.get('/admin/add_project', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates/admin/add_project.html'));
});

app.get('/admin/add_user', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates/admin/add_user.html'));
});

app.get('/admin/admin_dashboard_ai_tools', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates/admin/admin_dashboard_ai_tools.html'));
});

app.get('/admin/ai_smart_dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates/admin/AI_Smart_Dashboard.html'));
});

app.get('/admin/client_account_statements', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates/admin/Client_Account_Statements.html'));
});

app.get('/admin/general_settings', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates/admin/general_settings.html'));
});

app.get('/admin/generate_invoice', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates/admin/generate_invoice.html'));
});

app.get('/admin/generate_quote', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates/admin/generate_quote.html'));
});

app.get('/admin/manage_clients', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates/admin/manage_clients.html'));
});

app.get('/admin/manage_projects', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates/admin/manage_projects.html'));
});

app.get('/admin/manage_technicians', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates/admin/manage_technicians.html'));
});

app.get('/admin/map', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates/admin/map.html'));
});

app.get('/admin/notifications_system', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates/admin/Notifications_System.html'));
});

app.get('/admin/schedule', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates/admin/schedule.html'));
});

app.get('/admin/search_archive', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates/admin/search_archive.html'));
});

app.get('/admin/search_project', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates/admin/search_project.html'));
});

app.get('/auth/401', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates/auth/401.html'));
});

app.get('/auth/404', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates/auth/404.html'));
});

app.get('/auth/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates/auth/login.html'));
});

app.get('/auth/otp_verification', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates/auth/otp_verification.html'));
});

app.get('/auth/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates/auth/register.html'));
});

app.get('/reports/elevator_condition_report', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates/reports/elevator_condition_report.html'));
});

app.get('/reports/report_pdf', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates/reports/report_pdf.html'));
});

app.get('/reports/view_maintenance_reports', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates/reports/view_maintenance_reports.html'));
});

app.get('/shared/assign_technician', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates/shared/Assign_Technician.html'));
});

app.get('/shared/base', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates/shared/base.html'));
});

app.get('/shared/view_client_invoices', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates/shared/View_Client_Invoices.html'));
});

app.get('/technician/chat', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates/technician/chat.html'));
});

app.get('/technician/elevator_logs', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates/technician/elevator_logs.html'));
});

app.get('/technician/fault_report_form', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates/technician/fault_report_form.html'));
});

app.get('/technician/preventive_maintenance', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates/technician/preventive_maintenance.html'));
});

app.get('/technician/submit_report_with_form', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates/technician/submit_report_with_form.html'));
});

app.get('/technician/technician_ai_diagnosis', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates/technician/technician_ai_diagnosis.html'));
});

app.get('/technician/technician_breakdown_maintenance', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates/technician/technician_breakdown_maintenance.html'));
});

app.get('/technician/view_maintenance_reports', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates/technician/view_maintenance_reports.html'));
});

app.get('/', (req, res) => {
  res.redirect('/auth/login');
});

app.listen(port, () => {
  console.log('✅ RK LIFTS APP is running at: http://localhost:' + port);
});
