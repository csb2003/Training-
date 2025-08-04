// middleware/validateAndHashUser.js
const bcrypt = require('bcrypt');
const db = require('../db');

const validateAndHashUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  // 1. Check required fields
  if (!email || !password || !name) {
    return res.status(400).json({ message: 'Name, email and password are required.' });
  }

  // 2. Email format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format.' });
  }

  // 3. Password strength check
  if (password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters.' });
  }

  // 4. Check if email already exists
  try {
    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], async (err, results) => {
      if (err) {
        console.error('DB error:', err);
        return res.status(500).json({ message: 'Server error while checking email.' });
      }

      if (results.length > 0) {
        return res.status(409).json({ message: 'Email already exists.' });
      }

      // 5. Hash password
      const saltRounds = 10;
      const hashed = await bcrypt.hash(password, saltRounds);
      req.body.password = hashed;

      next(); // Continue to /register route handler
    });
  } catch (err) {
    console.error('Validation error:', err);
    res.status(500).json({ message: 'Something went wrong.' });
  }
};

module.exports = validateAndHashUser;
