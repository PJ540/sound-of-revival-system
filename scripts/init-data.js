const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('../models/User');
const Department = require('../models/Department');

async function initializeData() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/sound_of_revival');
    console.log('Connected to MongoDB');

    // Create admin user if doesn't exist
    const adminExists = await User.findOne({ email: 'admin@sor.com' });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      const admin = new User({
        firstName: 'Admin',
        lastName: 'SOR',
        email: 'admin@sor.com',
        password: hashedPassword,
        phone: '+1234567890',
        role: 'admin'
      });
      await admin.save();
      console.log('Admin user created: admin@sor.com / admin123');
    }

    // Create default departments
    const departments = [
      {
        name: 'Praise and Worship',
        description: 'Leading the congregation in heartfelt worship through vocals and song leadership.',
        responsibilities: [
          'Lead congregational singing',
          'Select appropriate worship songs',
          'Practice regularly with the team',
          'Maintain spiritual preparation through prayer'
        ],
        requirements: [
          'Strong vocal ability',
          'Heart for worship',
          'Regular church attendance',
          'Commitment to practice sessions'
        ]
      },
      {
        name: 'Instrumentalists',
        description: 'Providing musical accompaniment for worship services and special events.',
        responsibilities: [
          'Play instruments during worship services',
          'Attend regular practice sessions',
          'Learn new songs as needed',
          'Maintain and care for instruments'
        ],
        requirements: [
          'Proficiency in at least one instrument',
          'Ability to read music or play by ear',
          'Regular availability for services',
          'Own instrument (preferred)'
        ]
      },
      {
        name: 'Executive',
        description: 'Leadership team responsible for the overall direction and management of the ministry.',
        responsibilities: [
          'Make strategic decisions for the ministry',
          'Oversee department activities',
          'Manage ministry resources and budget',
          'Coordinate with church leadership'
        ],
        requirements: [
          'Leadership experience',
          'Strong organizational skills',
          'Spiritual maturity',
          'Time commitment for meetings and planning'
        ]
      },
      {
        name: 'Prayer Committee',
        description: 'Dedicated intercessors committed to prayer ministry and spiritual warfare.',
        responsibilities: [
          'Organize regular prayer meetings',
          'Pray for ministry needs and requests',
          'Provide prayer support for events',
          'Maintain prayer request lists'
        ],
        requirements: [
          'Strong prayer life',
          'Heart for intercession',
          'Confidentiality and discretion',
          'Regular availability for prayer meetings'
        ]
      },
      {
        name: 'Bible Study',
        description: 'Teaching and facilitating Bible study sessions to help members grow in faith.',
        responsibilities: [
          'Prepare and lead Bible study sessions',
          'Research and study scripture',
          'Facilitate group discussions',
          'Provide spiritual guidance to participants'
        ],
        requirements: [
          'Good knowledge of the Bible',
          'Teaching or facilitation skills',
          'Preparation time for lessons',
          'Heart for discipleship'
        ]
      },
      {
        name: 'Fun Base',
        description: 'Organizing fellowship activities and community building events for the ministry.',
        responsibilities: [
          'Plan and organize fellowship events',
          'Coordinate social activities',
          'Manage event logistics',
          'Foster community relationships'
        ],
        requirements: [
          'Event planning skills',
          'Creative and organized mindset',
          'Good communication skills',
          'Enthusiasm for community building'
        ]
      },
      {
        name: 'Photos',
        description: 'Capturing and documenting ministry activities, events, and special moments.',
        responsibilities: [
          'Photograph ministry events and services',
          'Edit and organize photos',
          'Create visual content for social media',
          'Maintain photo archives'
        ],
        requirements: [
          'Photography skills and equipment',
          'Photo editing knowledge',
          'Reliability for event coverage',
          'Eye for capturing meaningful moments'
        ]
      }
    ];

    for (const deptData of departments) {
      const exists = await Department.findOne({ name: deptData.name });
      if (!exists) {
        const department = new Department(deptData);
        await department.save();
        console.log(`Created department: ${deptData.name}`);
      }
    }

    console.log('Data initialization completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error initializing data:', error);
    process.exit(1);
  }
}

initializeData();