const fs = require('fs');
const path = require('path');

const dir = 'C:/Users/Admin/OneDrive/Desktop/landing page/src/components';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx') && f !== 'LandingPage.jsx' && f !== 'Footer.jsx');

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  if (content.includes('defaultLogo') && content.includes('>MessBee</span>')) {
    // Inject import if not present
    if (!content.includes('messbeeText')) {
      content = content.replace(
        /import defaultLogo from ['"]\.\.\/assets\/logo\.jpeg['"];/,
        `import defaultLogo from "../assets/logo.jpeg";\nimport messbeeText from "../assets/messbee_text.png";`
      );
    }
    
    // Replace the span
    content = content.replace(
      /<span[^>]*>MessBee<\/span>/g,
      `<img src={messbeeText} alt="MessBee Text" style={{ height: 22, objectFit: "contain" }} />`
    );
    
    fs.writeFileSync(filePath, content);
    console.log('Updated ' + file);
  }
}
