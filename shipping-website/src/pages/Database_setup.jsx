// server/config/database.js
const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'your_username',
    password: 'your_password',
    database: 'shipping_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool.promise();

// server/database.sql
CREATE DATABASE shipping_db;
USE shipping_db;

CREATE TABLE customers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    from_location VARCHAR(255),
    to_location VARCHAR(255),
    weight DECIMAL(10,2),
    package_type VARCHAR(50),
    price DECIMAL(10,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE enquiries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255),
    question TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

// server/routes/customers.js
const express = require('express');
const router = express.Router();
const db = require('../config/database');

router.post('/api/customers', async (req, res) => {
    try {
        const { name, phone, fromLocation, toLocation, weight, packageType, price } = req.body;
        
        const [result] = await db.execute(
            'INSERT INTO customers (name, phone, from_location, to_location, weight, package_type, price) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [name, phone, fromLocation, toLocation, weight, packageType, price]
        );
        
        res.status(201).json({ id: result.insertId, message: 'Customer added successfully' });
    } catch (error) {
        console.error('Error adding customer:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/api/customers', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM customers ORDER BY created_at DESC');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching customers:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// server/server.js
const express = require('express');
const cors = require('cors');
const customerRoutes = require('./routes/customers');

const app = express();

app.use(cors());
app.use(express.json());
app.use(customerRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Updated ShipForm.js component
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ShipForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        fromLocation: '',
        toLocation: '',
        weight: '',
        packageType: ''
    });
    const [price, setPrice] = useState(null);
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/customers');
            setCustomers(response.data);
        } catch (error) {
            console.error('Error fetching customers:', error);
        }
    };

    const calculatePrice = () => {
        const type = formData.packageType.toLowerCase();
        if (type === 'laptop') return 50;
        if (type === 'phone') return 25;
        return formData.weight * 12;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const estimatedPrice = calculatePrice();
        setPrice(estimatedPrice);

        try {
            await axios.post('http://localhost:5000/api/customers', {
                ...formData,
                price: estimatedPrice
            });
            await fetchCustomers(); // Refresh the customer list
            // Clear form
            setFormData({
                name: '',
                phone: '',
                fromLocation: '',
                toLocation: '',
                weight: '',
                packageType: ''
            });
        } catch (error) {
            console.error('Error saving customer:', error);
            alert('Error saving customer information');
        }
    };

    // Rest of the component remains the same...
};

export default ShipForm;