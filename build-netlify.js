#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🌐 Building Sound of Revival for Netlify deployment...');

// Create dist directory
if (!fs.existsSync('dist')) {
  fs.mkdirSync('dist', { recursive: true });
}

// Copy the static HTML file to dist
const publicIndexPath = path.join(__dirname, 'public', 'index.html');
const distIndexPath = path.join(__dirname, 'dist', 'index.html');

if (fs.existsSync(publicIndexPath)) {
  fs.copyFileSync(publicIndexPath, distIndexPath);
  console.log('✅ Copied index.html to dist directory');
} else {
  console.error('❌ public/index.html not found');
  process.exit(1);
}

// Create a simple 404 page
const notFoundHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page Not Found - Sound of Revival</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <style>
        .navbar-brand { font-weight: bold; color: #8B4513 !important; }
        .btn-primary { background-color: #8B4513; border-color: #8B4513; }
        .text-primary { color: #8B4513 !important; }
    </style>
</head>
<body>
    <nav class="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
        <div class="container">
            <a class="navbar-brand" href="/">
                <i class="fas fa-music me-2"></i>Sound of Revival
            </a>
        </div>
    </nav>
    
    <div class="container py-5">
        <div class="row justify-content-center">
            <div class="col-md-6 text-center">
                <i class="fas fa-exclamation-triangle fa-4x text-warning mb-4"></i>
                <h1 class="mb-4">Page Not Found</h1>
                <p class="lead mb-4">The page you're looking for doesn't exist in this static preview.</p>
                <a href="/" class="btn btn-primary">
                    <i class="fas fa-home me-2"></i>Go Home
                </a>
            </div>
        </div>
    </div>
</body>
</html>
`;

fs.writeFileSync(path.join(__dirname, 'dist', '404.html'), notFoundHtml);
console.log('✅ Created 404.html page');

// Create _redirects file for Netlify
const redirectsContent = `/*    /index.html   200`;
fs.writeFileSync(path.join(__dirname, 'dist', '_redirects'), redirectsContent);
console.log('✅ Created _redirects file');

console.log('✅ Netlify build completed successfully!');
console.log('📁 Files created in dist/ directory:');
console.log('   - index.html (main page)');
console.log('   - 404.html (error page)');
console.log('   - _redirects (routing rules)');
console.log('');
console.log('🚀 Ready for Netlify deployment!');
console.log('📖 Deploy settings:');
console.log('   Build command: npm run build:netlify');
console.log('   Publish directory: dist');
console.log('');
console.log('👨‍💻 Designed by Peter J');