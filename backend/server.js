const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3045;

// Middleware
app.use(cors({
    origin: ['http://localhost:8045', 'http://localhost:8081', 'http://localhost:8082', 'http://localhost:8083', 'http://localhost:5173'], // Allow requests from common frontend ports
    credentials: true
}));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', req.headers.origin || 'http://localhost:8045');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});
app.use(express.json());

// MongoDB connection (optional for auth functionality)
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/sports-hub', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB not available - sports CRUD operations will not work, but auth will function'));

// Routes
const authRoutes = require('./routes/auth');
const sportsRoutes = require('./routes/sports');
const matchesRoutes = require('./routes/matches');
app.use('/api/auth', authRoutes);
app.use('/api/sports', sportsRoutes);
app.use('/api/matches', matchesRoutes);

// Basic route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to DataArena Sports Hub API' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});