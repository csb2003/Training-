const express = require('express');
const cors = require('cors');
const app = express();
const mysql = require('mysql2')
const upload = require('./middleware/upload');
const validateandHashUser = require('./middleware/validateandHashUser');
const db = require('./db');
app.use(cors());
app.use(express.json());
const bcrypt = require('bcrypt');

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // 1. Check if email and password are provided
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password required' });
  }

  // 2. Query the DB for the user
  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], async (err, results) => {
    if (err) {
      console.error('DB error:', err);
      return res.status(500).json({ message: 'Server error' });
    }

    // 3. Check if user exists
    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const user = results[0];

    // 4. Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // 5. Success
    return res.status(200).json({ message: 'Login successful!', name: user.name });
  });
});


app.post('/register',validateandHashUser, (req,res)=>{
  const {name, email, password } = req.body;
  const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)'

  db.query(sql,[name, email, password], (err,results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server error' });
    }
    res.status(200).json({ message: 'User registered successfully!' });
  })
})

app.get('/api/users',(req,res)=>{
  const query = 'SELECT * FROM user_profiles'

  db.query(query,(error,results)=>{
    if (error){
      console.log("Error executing Query")
      res.status(500).send('Error retrieving data')
      return
    }
    res.json(results); // Send the data as JSON
  })

})


app.post('/api/add_entities',upload.single('logo'), (req,res) =>{
  const {
    name, pan, gstn, mobile,logo, cgst, sgst, igst,
    tdsRoi, addressLine1, addressLine2, addressLine3,
    state, city, pincode
  } = req.body;

  const logoPath = req.file ? req.file.filename : null;

  const sql = `INSERT INTO entities
    (name, pan, gstn, mobile, logo, cgst_percentage, sgst_percentage, igst_percentage, tds_roi_percentage,
     address_line_1, address_line_2, address_line_3, state, city, pincode)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [
    name, pan, gstn, mobile, logoPath, cgst, sgst, igst, tdsRoi,
    addressLine1, addressLine2, addressLine3, state, city, pincode
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting entity:', err);
      return res.status(500).json({ message: 'Error inserting entity' });
    }
    res.status(200).json({ message: 'Entity added successfully' });
  });
});

app.get('/api/list_entities', (req,res) =>{
  const query = 'SELECT * FROM entities'

  db.query(query,(error,results)=>{
    if (error){
      console.log("Error executing Query")
      res.status(500).send('Error retrieving data')
      return
    }
    res.json(results); // Send the data as JSON
  })
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
