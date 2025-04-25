const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

// Initialize Express app
const app = express();

// Middleware to parse JSON data from requests
app.use(bodyParser.json());

// Setup MySQL connection
const db = mysql.createConnection({
    host: 'your-rds-endpoint', // Get this from Terraform output or Secrets Manager
    user: 'your-db-user',
    password: process.env.DB_PASSWORD, // Fetch DB password from environment variables
    database: 'feedbackdb'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to DB:', err.stack);
        return;
    }
    console.log('Connected to the database');
});

// POST route to handle feedback form submission
app.post('/submit-feedback', (req, res) => {
    const { name, email, message } = req.body;

    // Insert data into RDS (MySQL)
    const query = 'INSERT INTO feedback (name, email, message) VALUES (?, ?, ?)';
    db.query(query, [name, email, message], (err, result) => {
        if (err) {
            res.status(500).json({ message: 'Error saving feedback', error: err });
            return;
        }
        res.status(200).json({ message: 'Feedback submitted successfully!' });
    });
});

// Start the server on port 3000
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
