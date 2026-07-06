const fs = require("fs");

const filesToUpdate = ["src/App.jsx", "src/components/LandingPage.jsx", "src/components/Navbar.jsx", "src/components/Footer.jsx"];

const replacements = {
    "bg-\\[#0B0F19\\]": "bg-darkbg",
    "bg-\\[#161F30\\]": "bg-darkbg-card",
    "bg-\\[#111827\\]": "bg-darkbg-card",
    "border-\\[#23324C\\]": "border-darkbg-border",
    "border-\\[#2E2E2E\\]": "border-darkbg-border",
    "text-white": "text-[#F5F5F5]",
    "text-slate-100": "text-[#F5F5F5]",
    "text-slate-200": "text-[#F5F5F5]"
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

