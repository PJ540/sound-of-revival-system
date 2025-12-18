# 🎵 Sound of Revival (SOR) - Christian Band Management System

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-5.0+-green.svg)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-Private-red.svg)](LICENSE)

A comprehensive web application for managing a Christian band with multiple departments, member registration, admin panel functionality, and photo gallery system.

## ✨ Features

### 🌐 Public Features
- **🏠 Home Page**: Ministry overview with department showcase
- **📖 About Page**: Detailed ministry mission, vision, and department information
- **👥 Departments Page**: Public view of all available departments
- **📸 Photo Gallery**: Members-only photo gallery with category filtering
- **📝 Member Registration**: Easy registration process for new members

### 👤 Member Features
- **📊 Member Dashboard**: Personalized dashboard with joined departments and announcements
- **🔄 Department Management**: Join or leave departments with one click
- **📢 Announcements**: View general and department-specific announcements
- **🖼️ Photo Gallery**: Browse ministry photos with lightbox viewing and category filters
- **🎯 Quick Actions**: Easy navigation to key member features

### 👨‍💼 Admin Features
- **📈 Admin Dashboard**: Comprehensive overview with member statistics and recent activity
- **🏢 Department Management**: Create, edit, delete, and manage all departments
- **📣 Announcement System**: Create targeted announcements for specific departments or all members
- **👥 Member Management**: View, edit, and manage all registered members
- **📷 Photo Management**: Upload, organize, and manage ministry photo gallery
- **🔧 Full CRUD Operations**: Complete management capabilities for all system entities

## 🏛️ Departments

The system includes 7 pre-configured ministry departments:

1. **🎤 Praise and Worship** - Vocal leaders and worship coordinators
2. **🎸 Instrumentalists** - Musicians providing musical accompaniment
3. **👔 Executive** - Leadership team managing the ministry
4. **🙏 Prayer Committee** - Dedicated intercessors and prayer warriors
5. **📚 Bible Study** - Teachers and facilitators for Bible study sessions
6. **🎉 Fun Base** - Fellowship and community event organizers
7. **📸 Photos** - Photography team documenting ministry activities

## 🛠️ Technology Stack

- **Backend**: Node.js with Express.js
- **Database**: MongoDB with Mongoose ODM
- **Frontend**: EJS templating engine with Bootstrap 5
- **Authentication**: Session-based authentication with bcrypt password hashing
- **File Upload**: Multer for photo upload functionality
- **Styling**: Bootstrap 5 with Font Awesome icons
- **Security**: Input validation, session management, and secure file handling

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (v5.0 or higher)
- Git

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/sound-of-revival-system.git
cd sound-of-revival-system
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
Create a `.env` file in the root directory:
```env
MONGODB_URI=mongodb://localhost:27017/sound_of_revival
SESSION_SECRET=your-super-secret-session-key
JWT_SECRET=your-jwt-secret-key
PORT=3001
```

### 4. Start MongoDB
Make sure MongoDB is running on your system:
```bash
# On Windows (if MongoDB is installed as a service)
net start MongoDB

# On macOS (using Homebrew)
brew services start mongodb-community

# On Linux
sudo systemctl start mongod
```

### 5. Initialize default data
```bash
node scripts/init-data.js
```
This creates:
- ✅ Default admin user: `admin@sor.com` / `admin123`
- ✅ All 7 departments with descriptions and requirements
- ✅ Sample data structure

### 6. Start the application
```bash
# Production mode
npm start

# Development mode (with nodemon)
npm run dev
```

### 7. Access the application
Open your browser and navigate to: **http://localhost:3001**

## 🔐 Default Login Credentials

**Admin Account:**
- 📧 Email: `admin@sor.com`
- 🔑 Password: `admin123`

## 📱 Usage Guide

### For New Visitors
1. 🌐 Browse the public website to learn about the ministry
2. 📝 Register for an account to access member features
3. 🔐 Login to access the full member dashboard

### For Members
1. 📊 Access your personalized dashboard
2. 👥 Browse and join departments that match your calling
3. 📢 Stay updated with announcements
4. 📸 Browse the ministry photo gallery
5. 🔄 Manage your department memberships

### For Administrators
1. 🔐 Login with admin credentials
2. 📈 Monitor ministry statistics on the admin dashboard
3. 🏢 Create and manage departments
4. 📣 Send targeted announcements
5. 👥 Manage member accounts
6. 📷 Upload and organize ministry photos

## 📁 Project Structure

```
sound-of-revival-system/
├── 📂 models/              # Database models
│   ├── 👤 User.js          # User model with authentication
│   ├── 🏢 Department.js    # Department model
│   ├── 📢 Announcement.js  # Announcement model
│   └── 📸 Photo.js         # Photo gallery model
├── 📂 routes/              # Express routes
│   ├── 🌐 public.js        # Public routes (home, about, etc.)
│   ├── 🔐 auth.js          # Authentication routes
│   ├── 👤 member.js        # Member-only routes
│   └── 👨‍💼 admin.js         # Admin-only routes
├── 📂 views/               # EJS templates
│   ├── 🏠 index.ejs        # Homepage
│   ├── 📖 about.ejs        # About page
│   ├── 👥 departments.ejs  # Departments page
│   ├── 📂 auth/            # Authentication pages
│   ├── 📂 member/          # Member area pages
│   └── 📂 admin/           # Admin panel pages
├── 📂 middleware/          # Custom middleware
│   └── 🔐 auth.js          # Authentication middleware
├── 📂 scripts/             # Utility scripts
│   └── 🔧 init-data.js     # Database initialization
├── 📂 uploads/             # User uploaded files
│   └── 📂 photos/          # Photo gallery uploads
├── 📂 public/              # Static files (CSS, JS, images)
├── 🚀 server.js            # Main application file
├── 📦 package.json         # Dependencies and scripts
├── 🔒 .env                 # Environment variables
├── 📝 README.md            # This file
└── 🚫 .gitignore           # Git ignore rules
```

## 🎯 Key Features Breakdown

### 🔐 Authentication System
- Secure user registration and login
- Session-based authentication
- Role-based access control (Member/Admin)
- Password hashing with bcrypt

### 👥 Department Management
- Dynamic department creation and management
- Member enrollment and management
- Department-specific announcements
- Leader assignment capabilities

### 📸 Photo Gallery System
- Secure photo upload with file validation
- Category-based organization
- Public/private photo visibility controls
- Responsive gallery with lightbox viewing
- Image filtering and search capabilities

### 📢 Announcement System
- General and department-specific announcements
- Priority levels (Low, Medium, High)
- Real-time updates for members
- Admin moderation and management

## 🤝 Contributing

We welcome contributions to improve the Sound of Revival system! Here's how you can help:

1. 🍴 Fork the repository
2. 🌿 Create a feature branch (`git checkout -b feature/amazing-feature`)
3. ✨ Make your changes
4. ✅ Test thoroughly
5. 📝 Commit your changes (`git commit -m 'Add amazing feature'`)
6. 📤 Push to the branch (`git push origin feature/amazing-feature`)
7. 🔄 Open a Pull Request

## 📄 License

This project is created for Sound of Revival Christian Band. All rights reserved.

## 👨‍💻 Developer

**Designed and Developed by Peter J**

## 🆘 Support

For support, questions, or feature requests:
- 📧 Create an issue in this repository
- 📞 Contact the development team
- 📖 Check the documentation

## 🙏 Acknowledgments

- Sound of Revival Christian Band for the opportunity
- The Christian community for inspiration
- All contributors and testers

---

*"Make a joyful noise unto the Lord, all ye lands." - Psalm 100:1*