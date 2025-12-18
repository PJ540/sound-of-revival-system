const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const multer = require('multer');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));
app.use(session({
  secret: process.env.SESSION_SECRET || 'sor-secret-key',
  resave: false,
  saveUninitialized: false
}));

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/sound_of_revival', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.log('MongoDB connection error:', err.message);
  console.log('Running without database - some features will be limited');
});

// Models
const User = require('./models/User');
const Department = require('./models/Department');
const Announcement = require('./models/Announcement');
const Photo = require('./models/Photo');

// Routes
app.use('/', require('./routes/public'));
app.use('/auth', require('./routes/auth'));
app.use('/member', require('./routes/member'));
app.use('/admin', require('./routes/admin'));

const PORT = process.env.PORT || 3001;

// Handle production environment
if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
  app.use(session({
    secret: process.env.SESSION_SECRET || 'sor-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true,
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
  }));
}
app.listen(PORT, () => {
  console.log(`Sound of Revival system running on port ${PORT}`);
});