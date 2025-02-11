const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Render login page
router.get('/login', (req, res) => {
    res.render('login', { title: 'Login Page' });
});

// Render signup page
router.get('/signup', (req, res) => {
    res.render('signup', { title: 'Signup Page' });
});

// Render dashboard page
router.get('/dashboard', async (req, res) => {
    try {
        // Fetch user from database (Replace with actual session/auth logic)
        const user = await User.findOne(); // Update this to fetch the logged-in user

        res.render('dashboard', { 
            title: 'Dashboard', 
            user: user || null 
        });
    } catch (err) {
        console.log(err);
        res.status(500).send('Server error');
    }
});


router.get('/swap', async (req, res) => {
    try {
        // Fetch the logged-in user (Modify this based on your authentication logic)
        const user = await User.findOne(); // Replace this with session-based fetching if needed

        res.render('swap', { 
            title: 'Swap Page', 
            user: user || null // Ensure user is passed to the template
        });
    } catch (err) {
        console.log(err);
        res.status(500).send('Server error');
    }
});




// Signup Route
router.post('/auth/signup', async (req, res) => {
    try {
        const { username, email, password, coin, money } = req.body;

        let user = await User.findOne({ email });
        if (user) {
            return res.send('User already exists');
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({
            username,
            email,
            password: hashedPassword,
            coin: !!coin,
            money: !!money
        });

        await user.save();
        res.redirect('/dashboard');
    } catch (err) {
        console.log(err);
        res.status(500).send('Server error');
    }
});

// Login Route
router.post('/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        let user = await User.findOne({ email });
        if (!user) {
            return res.send('Invalid email or password');
        }

        // Validate password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.send('Invalid email or password');
        }

        // Login successful
        res.redirect('/dashboard');
    } catch (err) {
        console.log(err);
        res.status(500).send('Server error');
    }
});

module.exports = router;
