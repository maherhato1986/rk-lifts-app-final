
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

// التوجيه الافتراضي إلى صفحة تسجيل الدخول
app.get('/', (req, res) => {
  res.redirect('/auth/login');
});

// توجيه ديناميكي لأي ملف HTML داخل مجلد templates الفرعي
app.get('/:folder/:file', (req, res) => {
  const folder = req.params.folder;
  const file = req.params.file;
  const fullPath = path.join(__dirname, 'templates', folder, file + '.html');

  if (fs.existsSync(fullPath)) {
    res.sendFile(fullPath);
  } else {
    res.status(404).send('Page not found');
  }
});

// تشغيل السيرفر
app.listen(port, () => {
  console.log(`✅ RK LIFTS APP is running at http://localhost:${port}`);
});
