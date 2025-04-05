
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    phone = db.Column(db.String(15), unique=True, nullable=False)
    name = db.Column(db.String(100))
    role = db.Column(db.String(20), nullable=False)  # admin or technician
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    # Relationships
    clients = db.relationship('Client', backref='added_by_user', lazy=True)
    projects = db.relationship('Project', backref='technician', lazy=True)


class Client(db.Model):
    __tablename__ = 'clients'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    phone = db.Column(db.String(15))
    email = db.Column(db.String(100))
    company = db.Column(db.String(100))
    added_by = db.Column(db.Integer, db.ForeignKey('users.id'))
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    projects = db.relationship('Project', backref='client', lazy=True)


class Project(db.Model):
    __tablename__ = 'projects'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    client_id = db.Column(db.Integer, db.ForeignKey('clients.id'))
    technician_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    status = db.Column(db.String(20), default='active')
    start_date = db.Column(db.Date)
    notes = db.Column(db.Text)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    quotes = db.relationship('Quote', backref='project', lazy=True)
    preventive_reports = db.relationship('PreventiveReport', backref='project', lazy=True)
    breakdown_reports = db.relationship('BreakdownReport', backref='project', lazy=True)


class Quote(db.Model):
    __tablename__ = 'quotes'
    id = db.Column(db.Integer, primary_key=True)
    project_id = db.Column(db.Integer, db.ForeignKey('projects.id'))
    amount = db.Column(db.Numeric(10, 2))
    items = db.Column(db.Text)
    created_by = db.Column(db.Integer, db.ForeignKey('users.id'))
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    invoices = db.relationship('Invoice', backref='quote', lazy=True)


class Invoice(db.Model):
    __tablename__ = 'invoices'
    id = db.Column(db.Integer, primary_key=True)
    quote_id = db.Column(db.Integer, db.ForeignKey('quotes.id'))
    client_id = db.Column(db.Integer, db.ForeignKey('clients.id'))
    amount = db.Column(db.Numeric(10, 2))
    due_date = db.Column(db.Date)
    status = db.Column(db.String(20), default='unpaid')
    created_at = db.Column(db.DateTime, server_default=db.func.now())


class PreventiveReport(db.Model):
    __tablename__ = 'preventive_reports'
    id = db.Column(db.Integer, primary_key=True)
    project_id = db.Column(db.Integer, db.ForeignKey('projects.id'))
    technician_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    report_date = db.Column(db.Date, server_default=db.func.current_date())
    checklist = db.Column(db.Text)
    notes = db.Column(db.Text)
    created_at = db.Column(db.DateTime, server_default=db.func.now())


class BreakdownReport(db.Model):
    __tablename__ = 'breakdown_reports'
    id = db.Column(db.Integer, primary_key=True)
    project_id = db.Column(db.Integer, db.ForeignKey('projects.id'))
    technician_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    description = db.Column(db.Text)
    report_date = db.Column(db.Date, server_default=db.func.current_date())
    status = db.Column(db.String(20), default='open')
    created_at = db.Column(db.DateTime, server_default=db.func.now())
