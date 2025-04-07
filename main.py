from flask import Flask, render_template, request, redirect, url_for
import psycopg2
import os

print("🚀 Launching RKLIFTS APP...")

app = Flask(__name__)

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

@app.route('/login', methods=['POST'])
def login():
    phone = request.form['phone']
    conn = get_db_connection()
    if conn is None:
        return "❌ فشل الاتصال بقاعدة البيانات"

    try:
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
            return "⚠️ رقم الجوال غير مسجل في النظام"
    except Exception as e:
        return f"❌ Error while querying DB: {e}"

@app.route('/admin')
def admin_dashboard():
    return render_template('admin_dashboard_ai_tools.html')

@app.route('/technician')
def technician_dashboard():
    return render_template('technician_dashboard.html')

@app.route('/test')
def test():
    return "✅ Server is alive!"


