const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/components/dashboards/CompanyAdminDashboard.jsx');
let content = fs.readFileSync(filePath, 'utf8');

let modified = content;

// 1. Dashboard titles
modified = modified.replace(/text-2xl sm:text-3xl md:text-4xl/g, 'text-xl sm:text-2xl md:text-2xl');
modified = modified.replace(/text-xl sm:text-2xl md:text-3xl/g, 'text-lg sm:text-xl md:text-2xl');

// 2. KPI numbers (usually text-3xl or text-4xl font-extrabold)
modified = modified.replace(/className="text-3xl font-extrabold/g, 'className="text-2xl font-extrabold');
modified = modified.replace(/className="text-4xl font-extrabold/g, 'className="text-3xl font-extrabold');
modified = modified.replace(/className="text-3xl font-bold/g, 'className="text-2xl font-bold');
modified = modified.replace(/className="text-4xl font-bold/g, 'className="text-3xl font-bold');

// Other specific huge texts if any
modified = modified.replace(/className="text-5xl/g, 'className="text-3xl');

if (modified !== content) {
    fs.writeFileSync(filePath, modified, 'utf8');
    console.log('Successfully updated text sizes in CompanyAdminDashboard.jsx');
} else {
    console.log('No changes were needed.');
}
