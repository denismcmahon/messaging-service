const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// register a new user
router.post('/register', async (req, res) => {
    try {
        // check if the email is already registered
        const existingUser = await User.findOne({ email: req.body.email });
        if(existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // hash the password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // create a new user
        const newUser = new User({
            email: req.body.email,
            password: hashedPassword
        });

        // save the user to the database
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch(err) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

// login a user
router.post('/login', async (req, res) => {
    try  {
        // check if user exists
        const user = await User.findOne({ email: req.body.email });
        if(!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // check if the password is correct
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if(!validPassword) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // generate jwt token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1hr' });

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;