const fs = require("fs");

const filesToUpdate = ["src/App.jsx", "src/components/LandingPage.jsx", "src/components/Navbar.jsx", "src/components/Footer.jsx"];

const replacements = {
    "text-slate-300": "text-[#F5F5F5]/90",
    "text-slate-400": "text-[#F5F5F5]/70",
    "text-slate-500": "text-[#F5F5F5]/50",
    "text-slate-600": "text-[#F5F5F5]/40"
};

filesToUpdate.forEach(filepath => {
    if (fs.existsSync(filepath)) {
        let content = fs.readFileSync(filepath, "utf-8");
        for (const [old, newStr] of Object.entries(replacements)) {
            const regex = new RegExp(old, "g");
            content = content.replace(regex, newStr);
        }
        fs.writeFileSync(filepath, content, "utf-8");
        console.log(`Updated ${filepath}`);
    }
});

