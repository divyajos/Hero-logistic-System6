import os
import re

files_to_update = ["src/App.jsx", "src/components/LandingPage.jsx", "src/components/Navbar.jsx", "src/components/Footer.jsx"]

replacements = {
    r"bg-\[\#0B0F19\]": "bg-darkbg",
    r"bg-\[\#161F30\]": "bg-darkbg-card",
    r"bg-\[\#111827\]": "bg-darkbg-card",
    r"border-\[\#23324C\]": "border-darkbg-border",
    r"border-\[\#2E2E2E\]": "border-darkbg-border",
    r"text-white": "text-[#F5F5F5]",
    r"text-slate-100": "text-[#F5F5F5]",
    r"text-slate-200": "text-[#F5F5F5]"
}

for filepath in files_to_update:
    if os.path.exists(filepath):
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()
        
        for old, new in replacements.items():
            content = re.sub(old, new, content)
            
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Updated {filepath}")

