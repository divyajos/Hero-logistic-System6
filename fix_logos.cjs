const fs = require("fs");

const filesToUpdate = ["src/components/OnboardingWizard.jsx", "src/components/common/Sidebar.jsx"];

filesToUpdate.forEach(filepath => {
    if (fs.existsSync(filepath)) {
        let content = fs.readFileSync(filepath, "utf-8");
        content = content.replace(/className="h-8 w-auto object-contain"/g, `className="h-12 w-auto object-contain"`);
        fs.writeFileSync(filepath, content, "utf-8");
        console.log(`Updated ${filepath}`);
    }
});

