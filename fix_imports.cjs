const fs = require('fs');
const path = require('path');

const dir = 'C:/Users/Admin/OneDrive/Desktop/landing page/src/components';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx') && f !== 'Navbar.jsx' && f !== 'Footer.jsx');

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  if (content.includes('<Navbar />') && !content.includes('import Navbar from')) {
    content = 'import Navbar from "./Navbar";\n' + content;
    fs.writeFileSync(filePath, content);
    console.log('Added import to ' + file);
  }
}
