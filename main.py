
from flask import Flask, render_template, request, redirect, url_for
import psycopg2
import os

app = Flask(__name__)

DATABASE_URL = os.environ.get("DATABASE_URL")

def get_db_connection():
    try:
        conn = psycopg2.connect(DATABASE_URL)
        return conn
    except Exception as e:
        print("❌ Database connection error:", e)
        return None

@app.route('/')
def home():
    return render_template('login.html')

@app.route('/login', methods=['POST'])
def login():
    phone = request.form['phone']
    conn = get_db_connection()
    if conn is None:
        return "❌ فشل الاتصال بقاعدة البيانات"
    
    cur = conn.cursor()
    cur.execute("SELECT role FROM users WHERE phone = %s", (phone,))
    result = cur.fetchone()
    cur.close()
    conn.close()

    if result:
        role = result[0]
        if role == 'admin':
            return redirect(url_for('admin_dashboard'))
        elif role in ('tech', 'technician'):
            return redirect(url_for('technician_dashboard'))
        else:
            return "⚠️ دور غير معروف"
    else:
        return "⚠️ رقم الجوال غير مسجل في النظام. الرجاء التواصل مع المدير: +966542805145 أو عبر البريد admin@rk-lifts.com"

# ======================
# مسارات المدير
# ======================
@app.route('/admin')
def admin_dashboard():
    return render_template('admin_dashboard_ai_tools.html')

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

@app.route('/admin/statements')
def admin_statements():
    return render_template('client_account_statements.html')

@app.route('/admin/settings')
def admin_settings():
    return render_template('general_settings.html')

@app.route('/admin/chat')
def admin_chat():
    return render_template('chat.html')

@app.route('/admin/reports')
def admin_reports():
    return render_template('reports.html')

# ======================
# مسارات الفني
# ======================
@app.route('/technician')
def technician_dashboard():
    return render_template('technician_dashboard.html')

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
    return render_template('view_maintenance_reports.html')

@app.route('/test')
def test():
    return "✅ Server is alive!"

if __name__ == '__main__':
    app.run(debug=True)
