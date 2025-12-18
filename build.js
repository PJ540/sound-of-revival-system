#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 Building Sound of Revival Management System...');

// Ensure public directory exists
if (!fs.existsSync('public')) {
  fs.mkdirSync('public', { recursive: true });
  console.log('✅ Created public directory');
}

// Ensure uploads directory exists
if (!fs.existsSync('uploads/photos')) {
  fs.mkdirSync('uploads/photos', { recursive: true });
  console.log('✅ Created uploads directory');
}

console.log('✅ Build completed successfully!');
console.log('');
console.log('📋 Deployment Options:');
console.log('  🔥 Heroku: git push heroku main');
console.log('  🚂 Railway: Connect GitHub repo at railway.app');
console.log('  🎨 Render: Connect GitHub repo at render.com');
console.log('  ⚡ Vercel: vercel --prod');
console.log('  🌐 Netlify: netlify deploy --prod --dir=public');
console.log('');
console.log('📖 See DEPLOYMENT.md for detailed instructions');
console.log('');
console.log('👨‍💻 Designed by Peter J');