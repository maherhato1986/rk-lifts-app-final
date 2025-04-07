
const express = require('express');
const path = require('path');
const { Pool } = require('pg');
const app = express();
const PORT = process.env.PORT || 3000;

// إعداد الاتصال بقاعدة البيانات على Render
const pool = new Pool({
  connectionString: 'postgres://rk_lifts_db_user:AtPNzbj2RVW2TKgk1DuzQ1yCHtVVJjIzI@dpg-cvq0edi4d50c73c090f0-a.render.com:5432/rk_lifts_db',
  ssl: {
    rejectUnauthorized: false
  }
});


// إعدادات Express
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// توجيه صفحة تسجيل الدخول
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates', 'login.html'));
});

// معالجة تسجيل الدخول
app.post('/login', async (req, res) => {
  const { phone } = req.body;
  try {
    const result = await pool.query('SELECT role FROM users WHERE phone = $1', [phone]);
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Please ask the administrator to register your number in the system. Contact: +966542805145 or admin@rk-lifts.com"
      });
    }

    const role = result.rows[0].role;
    if (role === 'admin') {
      res.json({ success: true, redirect: '/admin/dashboard' });
    } else if (role === 'technician') {
      res.json({ success: true, redirect: '/technician/dashboard' });
    } else {
      res.status(403).json({ success: false, message: 'Unauthorized role' });
    }
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// تشغيل السيرفر
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
