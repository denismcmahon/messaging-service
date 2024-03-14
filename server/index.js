const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// load environment variables from .env file
dotenv.config();

// create express application
const app = express();

// middleware to parse json requests
app.use(express.json());

// cors middleware to allow request from any origin
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// routes
app.use('/api', require('./routes/authRoutes'));

// connect to mongodb
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('Connected to MongoDB')
        // start the server
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => console.error('Error connecting to MongoDB:', err));