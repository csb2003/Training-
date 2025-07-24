// backend/index.js
const express = require('express');
const cors = require('cors');
const app = express();
const mysql = require('mysql2')

app.use(cors());
app.use(express.json());


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'chinmaysb246@#$',
  database: 'cashinvoice'
});

db.connect(err => {
  if (err) {
    console.error('❌ DB connection failed:', err);
  } else {
    console.log('✅ Connected to MySQL database');
  }
});

app.post('/login', (req, res) => {
  const { name, email, password } = req.body;

  const sql = 'SELECT * FROM users WHERE name = ? AND email = ? AND password = ?';
  db.query(sql, [name, email, password], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server error' });
    }

    if (results.length > 0) {
      res.json({ message: 'Login successful!' });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  });
});



app.get('/', (req, res) => {
  res.send("hello world!");
});

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from backend!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
