const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();
const { adminMiddleware } = require('../middleware/auth');
const User = require('../models/User');
const Department = require('../models/Department');
const Announcement = require('../models/Announcement');
const Photo = require('../models/Photo');

// Configure multer for photo uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = 'uploads/photos';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'photo-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: function (req, file, cb) {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

// Apply admin middleware to all admin routes
router.use(adminMiddleware);

// Admin dashboard
router.get('/dashboard', async (req, res) => {
  try {
    const totalMembers = await User.countDocuments({ role: 'member' });
    const totalDepartments = await Department.countDocuments({ isActive: true });
    const recentMembers = await User.find({ role: 'member' })
      .sort({ joinedDate: -1 })
      .limit(5);
    
    res.render('admin/dashboard', {
      user: req.session,
      stats: { totalMembers, totalDepartments },
      recentMembers
    });
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Manage departments
router.get('/departments', async (req, res) => {
  try {
    const departments = await Department.find()
      .populate('leader', 'firstName lastName')
      .populate('members', 'firstName lastName');
    
    res.render('admin/departments', {
      user: req.session,
      departments
    });
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Create department
router.post('/departments', async (req, res) => {
  try {
    const { name, description, responsibilities, requirements } = req.body;
    
    const department = new Department({
      name,
      description,
      responsibilities: responsibilities.split('\n').filter(r => r.trim()),
      requirements: requirements.split('\n').filter(r => r.trim())
    });
    
    await department.save();
    res.redirect('/admin/departments');
  } catch (error) {
    res.status(500).send('Error creating department');
  }
});

// Edit department
router.post('/departments/:id/edit', async (req, res) => {
  try {
    const { name, description, responsibilities, requirements } = req.body;
    
    await Department.findByIdAndUpdate(req.params.id, {
      name,
      description,
      responsibilities: responsibilities.split('\n').filter(r => r.trim()),
      requirements: requirements.split('\n').filter(r => r.trim())
    });
    
    res.redirect('/admin/departments');
  } catch (error) {
    res.status(500).send('Error updating department');
  }
});

// Delete department
router.post('/departments/:id/delete', async (req, res) => {
  try {
    // Remove department from all users
    await User.updateMany(
      { departments: req.params.id },
      { $pull: { departments: req.params.id } }
    );
    
    // Delete the department
    await Department.findByIdAndDelete(req.params.id);
    
    res.redirect('/admin/departments');
  } catch (error) {
    res.status(500).send('Error deleting department');
  }
});

// Manage announcements
router.get('/announcements', async (req, res) => {
  try {
    const announcements = await Announcement.find()
      .populate('author', 'firstName lastName')
      .populate('department', 'name')
      .sort({ createdDate: -1 });
    
    const departments = await Department.find({ isActive: true });
    
    res.render('admin/announcements', {
      user: req.session,
      announcements,
      departments
    });
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Create announcement
router.post('/announcements', async (req, res) => {
  try {
    const { title, content, department, priority } = req.body;
    
    const announcement = new Announcement({
      title,
      content,
      department: department || null,
      author: req.session.userId,
      priority
    });
    
    await announcement.save();
    res.redirect('/admin/announcements');
  } catch (error) {
    res.status(500).send('Error creating announcement');
  }
});

// Manage members
router.get('/members', async (req, res) => {
  try {
    const members = await User.find({ role: 'member' })
      .populate('departments', 'name');
    
    res.render('admin/members', {
      user: req.session,
      members
    });
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Edit member
router.post('/members/:id/edit', async (req, res) => {
  try {
    const { firstName, lastName, email, phone, isActive } = req.body;
    
    await User.findByIdAndUpdate(req.params.id, {
      firstName,
      lastName,
      email,
      phone,
      isActive: isActive === 'on'
    });
    
    res.redirect('/admin/members');
  } catch (error) {
    res.status(500).send('Error updating member');
  }
});

// Delete member
router.post('/members/:id/delete', async (req, res) => {
  try {
    const userId = req.params.id;
    
    // Remove user from all departments
    await Department.updateMany(
      { members: userId },
      { $pull: { members: userId } }
    );
    
    // Delete the user
    await User.findByIdAndDelete(userId);
    
    res.redirect('/admin/members');
  } catch (error) {
    res.status(500).send('Error deleting member');
  }
});

module.exports = router;


// Photo gallery management
router.get('/photos', async (req, res) => {
  try {
    const photos = await Photo.find()
      .populate('uploadedBy', 'firstName lastName')
      .sort({ uploadDate: -1 });
    
    res.render('admin/photos', {
      user: req.session,
      photos
    });
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Upload photo
router.post('/photos/upload', upload.single('photo'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('No file uploaded');
    }
    
    const { title, description, category } = req.body;
    
    const photo = new Photo({
      title,
      description,
      filename: req.file.filename,
      originalName: req.file.originalname,
      path: '/uploads/photos/' + req.file.filename,
      size: req.file.size,
      uploadedBy: req.session.userId,
      category: category || 'other'
    });
    
    await photo.save();
    res.redirect('/admin/photos');
  } catch (error) {
    res.status(500).send('Error uploading photo');
  }
});

// Delete photo
router.post('/photos/:id/delete', async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.id);
    
    if (photo) {
      // Delete file from filesystem
      const filePath = path.join(__dirname, '..', 'uploads', 'photos', photo.filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      
      // Delete from database
      await Photo.findByIdAndDelete(req.params.id);
    }
    
    res.redirect('/admin/photos');
  } catch (error) {
    res.status(500).send('Error deleting photo');
  }
});

// Toggle photo visibility
router.post('/photos/:id/toggle', async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.id);
    if (photo) {
      photo.isPublic = !photo.isPublic;
      await photo.save();
    }
    res.redirect('/admin/photos');
  } catch (error) {
    res.status(500).send('Error updating photo');
  }
});
