const fs = require('fs');
const path = require('path');

const dir = 'C:/Users/Admin/OneDrive/Desktop/landing page/src/components';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx') && f !== 'Navbar.jsx' && f !== 'Footer.jsx');

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  let modified = false;

  // Add import if not present
  if (!content.includes('import Navbar from')) {
    content = content.replace(/(import React.*?;\n)/, `$1import Navbar from "./Navbar";\n`);
  }

  // Remove the old Navbar style block if it exists
  const styleRegex = /<style>\{`[\s\S]*?\.nav-btn-[\s\S]*?`\}<\/style>\s*/g;
  if (styleRegex.test(content)) {
    content = content.replace(styleRegex, '');
    modified = true;
  }

  // Replace <nav>...</nav> with <Navbar />
  // Careful: we only want the FIRST <nav> in the file, which is the main header.
  // We'll use a non-greedy match to find the first <nav>...</nav>
  // Wait, if there are multiple <nav>, we might replace the wrong one, but usually there's only one header nav.
  
  const navRegex = /<nav[\s\S]*?<\/nav>/;
  if (navRegex.test(content)) {
    content = content.replace(navRegex, '<Navbar />');
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(filePath, content);
    console.log('Updated ' + file);
  }
}
