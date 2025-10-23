const fs = require('fs');
const path = require('path');

// Simple build script to copy source to dist
const srcDir = path.join(__dirname, 'src');
const distDir = path.join(__dirname, 'dist');

// Create dist directory if it doesn't exist
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Copy index.js to dist
const srcFile = path.join(srcDir, 'index.js');
const distFile = path.join(distDir, 'index.js');

fs.copyFileSync(srcFile, distFile);

// Make it executable
if (process.platform !== 'win32') {
  fs.chmodSync(distFile, '755');
}

console.log('✅ Build complete: dist/index.js');
