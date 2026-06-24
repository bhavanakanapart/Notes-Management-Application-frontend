const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRouter = require('./routers/authRoutes');
const noteRouter = require('./routers/noteRoutes');
require('dotenv').config();

const app = express();

// CORS
app.use(cors({
    origin: [
        'http://localhost:5173',
        'http://127.0.0.1:5173',
        'https://notesmanagementsystemm.netlify.app'
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(express.json());

// Logger
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Routes
app.use('/api/auth', authRouter);
app.use('/api/notes', noteRouter);

app.get('/', (req, res) => {
    res.json({
        message: 'Notes Manager API is running'
    });
});

// MongoDB
mongoose.connect(process.env.mongodb)
.then(() => {
    console.log('✅ MongoDB connected successfully');
})
.catch(err => {
    console.log('❌ MongoDB Error:', err.message);
});

const PORT = process.env.PORT || 3450;

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});