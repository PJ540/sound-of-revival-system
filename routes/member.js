const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth');
const User = require('../models/User');
const Department = require('../models/Department');
const Announcement = require('../models/Announcement');

// Apply auth middleware to all member routes
router.use(authMiddleware);

// Member dashboard
router.get('/dashboard', async (req, res) => {
  try {
    const user = await User.findById(req.session.userId)
      .populate('departments', 'name description');
    
    const announcements = await Announcement.find({
      $or: [
        { department: null }, // General announcements
        { department: { $in: user.departments } } // Department specific
      ],
      isActive: true
    }).populate('author', 'firstName lastName')
      .populate('department', 'name')
      .sort({ createdDate: -1 })
      .limit(10);
    
    res.render('member/dashboard', { 
      user: req.session,
      userDetails: user,
      announcements
    });
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Join department
router.post('/join-department/:id', async (req, res) => {
  try {
    const departmentId = req.params.id;
    const userId = req.session.userId;
    
    await User.findByIdAndUpdate(userId, {
      $addToSet: { departments: departmentId }
    });
    
    await Department.findByIdAndUpdate(departmentId, {
      $addToSet: { members: userId }
    });
    
    res.redirect('/member/dashboard');
  } catch (error) {
    res.status(500).send('Error joining department');
  }
});

// Leave department
router.post('/leave-department/:id', async (req, res) => {
  try {
    const departmentId = req.params.id;
    const userId = req.session.userId;
    
    await User.findByIdAndUpdate(userId, {
      $pull: { departments: departmentId }
    });
    
    await Department.findByIdAndUpdate(departmentId, {
      $pull: { members: userId }
    });
    
    res.redirect('/member/dashboard');
  } catch (error) {
    res.status(500).send('Error leaving department');
  }
});

// View all departments
router.get('/departments', async (req, res) => {
  try {
    const user = await User.findById(req.session.userId);
    const departments = await Department.find({ isActive: true })
      .populate('leader', 'firstName lastName')
      .populate('members', 'firstName lastName');
    
    res.render('member/departments', { 
      user: req.session,
      departments,
      userDepartments: user.departments
    });
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Photos gallery - members only
router.get('/photos', async (req, res) => {
  try {
    const Photo = require('../models/Photo');
    const photos = await Photo.find({ isPublic: true })
      .populate('uploadedBy', 'firstName lastName')
      .sort({ uploadDate: -1 });
    
    res.render('member/photos', { 
      photos,
      user: req.session
    });
  } catch (error) {
    res.status(500).send('Server error');
  }
});

module.exports = router;