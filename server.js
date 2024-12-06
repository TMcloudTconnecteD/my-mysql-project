const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = 33060;

// Middleware
app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '0022post.OFF@202212794',
    database: 'buyers_db', // Replace with your database name
    port: 33060
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
    } else {
        console.log('Connected to MySQL!');
    }
});

// Route to add an item
app.post('/add-item', (req, res) => {
    const { farmer_name, item_name, quantity, price, description } = req.body;

    if (!farmer_name || !item_name || !quantity || !price || !description) {
        return res.status(400).send('All fields are required!');
    }

    const query = `INSERT INTO items (farmer_name, item_name, quantity, price, description) VALUES (?, ?, ?, ?, ?)`;
    db.query(query, [farmer_name, item_name, quantity, price, description], (err) => {
        if (err) {
            console.error('Error inserting item:', err);
            return res.status(500).send('Failed to add item.');
        }
        res.status(200).send('Item added successfully!');
    });
});

// Route to get all items
app.get('/items', (req, res) => {
    const query = `SELECT * FROM items`;
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error retrieving items:', err);
            return res.status(500).send('Failed to fetch items.');
        }
        res.json(results);
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
