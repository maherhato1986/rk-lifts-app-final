from flask import Flask, render_template, request, redirect, url_for
import psycopg2
import os

application = Flask(__name__)

# رابط قاعدة البيانات من Railway
DATABASE_URL = os.environ.get("DATABASE_URL")  # أفضل نخليه ديناميكي بدل ما نثبته

def get_db_connection():
    conn = psycopg2.connect(DATABASE_URL)
    return conn

@application.route('/')
def home():
    return render_template('login.html')

@application.route('/login', methods=['POST'])
def login():
    phone = request.form['phone_number']
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT role FROM users WHERE phone = %s", (phone,))  # ✅ تم التعديل هنا
    result = cur.fetchone()
    cur.close()
    conn.close()

    if result:
        role = result[0]
        if role == 'admin':
            return redirect(url_for('admin_dashboard'))
        elif role == 'tech':
            return redirect(url_for('technician_dashboard'))
        else:
            return "دور غير معروف"
    else:
        return "رقم الجوال غير مسجل في النظام"

@application.route('/admin')
def admin_dashboard():
    return render_template('admin_dashboard_ai_tools.html')

@application.route('/technician')
def technician_dashboard():
    return render_template('technician_dashboard.html')
