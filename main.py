
from flask import Flask, render_template, request, redirect, url_for, session, flash
from datetime import timedelta
from config import Config
from models import db, User

app = Flask(__name__)
app.config.from_object(Config)
db.init_app(app)


@app.route("/", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        phone = request.form.get("phone")
        otp = request.form.get("otp")

        user = User.query.filter_by(phone=phone, is_active=True).first()
        if user:
            if (user.role == "admin" and otp == "4321") or (user.role == "technician" and otp == "55555"):
                session["user"] = phone
                session["role"] = user.role
                if user.role == "admin":
                    return redirect("/admin")
                else:
                    return redirect("/technician")
            else:
                flash("Incorrect OTP.")
        else:
            flash("Phone number not authorized.")
    return render_template("login.html")

@app.route("/admin")
def admin_dashboard():
    if session.get("role") == "admin":
        return "Welcome to the Admin Dashboard!"
    return redirect(url_for("login"))

@app.route("/technician")
def technician_dashboard():
    if session.get("role") == "technician":
        return "Welcome to the Technician Dashboard!"
    return redirect(url_for("login"))

@app.route("/logout")
def logout():
    session.clear()
    return redirect(url_for("login"))


@app.route("/clients", methods=["GET", "POST"])
def manage_clients():
    from models import db, Client
    if request.method == "POST":
        name = request.form.get("name")
        phone = request.form.get("phone")
        email = request.form.get("email")
        company = request.form.get("company")
        user_id = 1  # Temporary: Admin ID 1 as added_by
        new_client = Client(name=name, phone=phone, email=email, company=company, added_by=user_id)
        db.session.add(new_client)
        db.session.commit()
        return redirect(url_for("manage_clients"))
    clients = Client.query.all()
    return render_template("manage_clients.html", clients=clients)


if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)
