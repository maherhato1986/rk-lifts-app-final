
from flask import Flask, render_template, request, redirect, url_for, session
import psycopg2
import os
import random

print("🚀 Launching RKLIFTS APP...")

app = Flask(__name__)
app.secret_key = os.environ.get("SECRET_KEY", "rklifts-default-secret")

# رابط قاعدة البيانات من البيئة
DATABASE_URL = os.environ.get("DATABASE_URL")

def get_db_connection():
    try:
        conn = psycopg2.connect(DATABASE_URL)
        print("✅ Connected to DB successfully.")
        return conn
    except Exception as e:
        print("❌ Database connection error:", e)
        return None

@app.route('/')
def home():
    return render_template('login.html')

@app.route('/send-otp', methods=['POST'])
def send_otp():
    phone = request.form['phone']
    conn = get_db_connection()
    if conn is None:
        return render_template("login.html", message="❌ Database connection failed")

    cur = conn.cursor()
    cur.execute("SELECT role FROM users WHERE phone = %s", (phone,))
    result = cur.fetchone()
    cur.close()
    conn.close()

    if result:
        otp = str(random.randint(100000, 999999))
        session['otp'] = otp
        session['phone'] = phone
        session['role'] = result[0]
        print(f"🔐 OTP for {phone} is {otp}")  # For testing
        return render_template("login.html", message="OTP has been sent.")
    else:
        return render_template("login.html", message="Please ask the administrator to register your number in the system. Contact: +966542805145 or admin@rk-lifts.com")

@app.route('/verify-otp', methods=['POST'])
def verify_otp():
    entered_otp = request.form['otp']
    saved_otp = session.get('otp')
    role = session.get('role')

    if entered_otp == saved_otp:
        if role == 'admin':
            return redirect(url_for('admin_dashboard'))
        elif role in ('tech', 'technician'):
            return redirect(url_for('technician_dashboard'))
        else:
            return "⚠️ Unknown role"
    else:
        return render_template("login.html", message="❌ Invalid OTP")

@app.route('/admin')
def admin_dashboard():
    return render_template('admin_dashboard_ai_tools.html')

@app.route('/technician')
def technician_dashboard():
    return render_template('technician_dashboard.html')


@app.route('/admin/projects')
def admin_projects():
    return render_template('manage_projects.html')

@app.route('/admin/clients')
def admin_clients():
    return render_template('manage_clients.html')

@app.route('/admin/invoices')
def admin_invoices():
    return render_template('view_invoices.html')

@app.route('/admin/quotes')
def admin_quotes():
    return render_template('generate_quote.html')

@app.route('/admin/settings')
def admin_settings():
    return render_template('general_settings.html')

@app.route('/admin/statements')
def admin_statements():
    return render_template('Client_Account_Statements.html')


@app.route('/technician/maintenance')
def technician_maintenance():
    return render_template('preventive_maintenance.html')

@app.route('/technician/faults')
def technician_faults():
    return render_template('fault_reports.html')

@app.route('/technician/submit-report')
def technician_submit_report():
    return render_template('submit_report.html')

@app.route('/technician/ai-assist')
def technician_ai_assist():
    return render_template('technician_ai_assistance.html')

@app.route('/technician/reports')
def technician_reports():
    return render_template('reports.html')


@app.route('/test')
def test():
    return "✅ Server is alive!"
