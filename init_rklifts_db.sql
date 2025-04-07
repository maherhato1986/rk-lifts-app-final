
-- إنشاء جدول المستخدمين
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    phone VARCHAR(20) UNIQUE NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('admin', 'technician')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- إضافة مدير تجريبي
INSERT INTO users (phone, role) VALUES
('0551234567', 'admin')
ON CONFLICT (phone) DO NOTHING;

-- إضافة فني تجريبي
INSERT INTO users (phone, role) VALUES
('0567654321', 'technician')
ON CONFLICT (phone) DO NOTHING;
