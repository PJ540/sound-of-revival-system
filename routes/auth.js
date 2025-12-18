const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const User = require('../models/User');

// Registration page
router.get('/register', (req, res) => {
  res.render('auth/register', { error: null });
});

// Registration process
router.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, email, password, phone } = req.body;
    
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.render('auth/register', { error: 'Email already registered' });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create user
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phone
    });
    
    await user.save();
    
    // Auto login after registration
    req.session.userId = user._id;
    req.session.firstName = user.firstName;
    req.session.role = user.role;
    
    res.redirect('/member/dashboard');
  } catch (error) {
    res.render('auth/register', { error: 'Registration failed' });
  }
});

// Login page
router.get('/login', (req, res) => {
  const redirect = req.query.redirect;
  res.render('auth/login', { error: null, redirect });
});

// Login process
router.post('/login', async (req, res) => {
  try {
    const { email, password, redirect } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.render('auth/login', { error: 'Invalid credentials', redirect });
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.render('auth/login', { error: 'Invalid credentials', redirect });
    }
    
    req.session.userId = user._id;
    req.session.firstName = user.firstName;
    req.session.role = user.role;
    
    // Handle redirect after login
    if (redirect === 'photos') {
      res.redirect('/member/photos');
    } else if (user.role === 'admin') {
      res.redirect('/admin/dashboard');
    } else {
      res.redirect('/member/dashboard');
    }
  } catch (error) {
    res.render('auth/login', { error: 'Login failed', redirect: null });
  }
});

// Logout
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;