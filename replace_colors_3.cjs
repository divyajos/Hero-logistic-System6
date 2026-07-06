const fs = require("fs");

const filesToUpdate = ["src/components/LandingPage.jsx", "src/components/Navbar.jsx", "src/components/Footer.jsx"];

const replacements = {
    "bg-\\[#1f2a3f\\]": "bg-[#2E2E2E]",
    "bg-\\[#141414\\]": "bg-darkbg-card",
    "bg-\\[#0B0B0B\\]": "bg-darkbg"
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

