const fs = require("fs");

const updates = [
  {
    file: "src/components/Navbar.jsx",
    oldStr: `className="h-14 w-auto object-contain"`,
    newStr: `className="h-20 w-auto object-contain py-1"`
  },
  {
    file: "src/components/Navbar.jsx",
    oldStr: `className="flex items-center justify-between h-12"`,
    newStr: `className="flex items-center justify-between min-h-[80px]"`
  },
  {
    file: "src/components/AuthPages.jsx",
    oldStr: `style={{ height: 64, width: "auto", objectFit: "contain" }}`,
    newStr: `style={{ height: 100, width: "auto", objectFit: "contain" }}`
  },
  {
    file: "src/components/Footer.jsx",
    oldStr: `className="h-12 w-auto object-contain"`,
    newStr: `className="h-[84px] w-auto object-contain"`
  }
];

updates.forEach(u => {
    if (fs.existsSync(u.file)) {
        let content = fs.readFileSync(u.file, "utf-8");
        content = content.replace(u.oldStr, u.newStr);
        fs.writeFileSync(u.file, content, "utf-8");
        console.log(`Updated ${u.file}`);
    }
});

