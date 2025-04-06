
import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY', 'dev_secret_key')
    SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:yourpassword@yamanote.proxy.rlwy.net:32743/railway'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
