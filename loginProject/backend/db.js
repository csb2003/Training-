const mysql = require('mysql2')


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

module.exports = db;
