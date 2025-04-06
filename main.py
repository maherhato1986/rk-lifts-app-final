
from flask import Flask, render_template, request, redirect, url_for, session
from flask_sqlalchemy import SQLAlchemy
from config import Config
from models import db, User
from datetime import datetime
import os

app = Flask(__name__)
app.config.from_object(Config)
db.init_app(app)

@app.route('/')
def index():
    return render_template('login.html')

@app.route('/verify_otp', methods=['POST'])
def verify_otp():
    phone = request.form['phone']
    otp = request.form['otp']

    user = User.query.filter_by(phone=phone).first()
    if user and user.is_active:
        if (user.role == 'admin' and otp == '4321') or (user.role == 'technician' and otp == '55555'):
            session['user_id'] = user.id
            session['role'] = user.role
            if user.role == 'admin':
                return redirect('/admin_dashboard_ai_tools.html')
            elif user.role == 'technician':
                return redirect('/technician_dashboard.html')
    return render_template('401.html')

@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('index'))

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=False, host='0.0.0.0', port=port)
