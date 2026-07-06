const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/components/dashboards/CompanyAdminDashboard.jsx');
let content = fs.readFileSync(filePath, 'utf8');

let modified = content;

// Replace remaining massive text sizes for headings and numbers
modified = modified.replace(/text-3xl font-black/g, 'text-2xl font-black');
modified = modified.replace(/text-4xl font-black/g, 'text-3xl font-black');
modified = modified.replace(/text-5xl font-black/g, 'text-3xl font-black');

// For any other h2 or h3 with text-3xl or text-4xl that wasn't caught
modified = modified.replace(/<h2 className="text-3xl/g, '<h2 className="text-2xl');
modified = modified.replace(/<h2 className="text-4xl/g, '<h2 className="text-2xl');

modified = modified.replace(/<h3 className="text-3xl/g, '<h3 className="text-2xl');
modified = modified.replace(/<h3 className="text-4xl/g, '<h3 className="text-2xl');

if (modified !== content) {
    fs.writeFileSync(filePath, modified, 'utf8');
    console.log('Successfully updated remaining text sizes in CompanyAdminDashboard.jsx');
} else {
    console.log('No changes were needed for part 2.');
}
