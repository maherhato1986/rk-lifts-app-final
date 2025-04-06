
from main import app
from models import db, User

with app.app_context():
    # Check if admin already exists
    existing = User.query.filter_by(phone="0500000001").first()
    if not existing:
        new_admin = User(
            phone='0500000001',
            name='Admin User',
            role='admin',
            is_active=True
        )
        db.session.add(new_admin)
        db.session.commit()
        print("✅ Admin added successfully.")
    else:
        print("⚠️ Admin already exists.")
