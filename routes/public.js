const express = require('express');
const router = express.Router();
const Department = require('../models/Department');
const Announcement = require('../models/Announcement');

// Home page - public view
router.get('/', async (req, res) => {
  try {
    let departments = [];
    let announcements = [];
    
    try {
      departments = await Department.find({ isActive: true });
      announcements = await Announcement.find({ 
        isActive: true, 
        department: null 
      }).populate('author', 'firstName lastName').limit(5);
    } catch (dbError) {
      // If database is not available, use mock data
      departments = [
        { name: 'Praise and Worship', description: 'Leading the congregation in heartfelt worship through vocals and song leadership.' },
        { name: 'Instrumentalists', description: 'Providing musical accompaniment for worship services and special events.' },
        { name: 'Prayer Committee', description: 'Dedicated intercessors committed to prayer ministry and spiritual warfare.' }
      ];
      announcements = [];
    }
    
    res.render('index', { 
      departments, 
      announcements,
      user: req.session.userId ? req.session : null
    });
  } catch (error) {
    res.status(500).send('Server error: ' + error.message);
  }
});

// About page
router.get('/about', (req, res) => {
  res.render('about', { user: req.session.userId ? req.session : null });
});

// Photos gallery page - redirect to login if not authenticated
router.get('/photos', (req, res) => {
  if (req.session.userId) {
    res.redirect('/member/photos');
  } else {
    res.redirect('/auth/login?redirect=photos');
  }
});

// Departments page
router.get('/departments', async (req, res) => {
  try {
    let departments = [];
    
    try {
      departments = await Department.find({ isActive: true })
        .populate('leader', 'firstName lastName')
        .populate('members', 'firstName lastName');
    } catch (dbError) {
      // Mock data if database not available
      departments = [
        { 
          name: 'Praise and Worship', 
          description: 'Leading the congregation in heartfelt worship through vocals and song leadership.',
          responsibilities: ['Lead congregational singing', 'Select appropriate worship songs'],
          requirements: ['Strong vocal ability', 'Heart for worship'],
          members: [],
          leader: null
        },
        { 
          name: 'Instrumentalists', 
          description: 'Providing musical accompaniment for worship services and special events.',
          responsibilities: ['Play instruments during worship services', 'Attend regular practice sessions'],
          requirements: ['Proficiency in at least one instrument', 'Ability to read music or play by ear'],
          members: [],
          leader: null
        }
      ];
    }
    
    res.render('departments', { 
      departments,
      user: req.session.userId ? req.session : null,
      userDepartments: []
    });
  } catch (error) {
    res.status(500).send('Server error: ' + error.message);
  }
});

module.exports = router;