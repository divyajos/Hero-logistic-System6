const fs = require("fs");
const path = "src/components/dashboards/CompanyAdminDashboard.jsx";
let content = fs.readFileSync(path, "utf8");

content = content.replace(
  /<div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Loads <span className="text-\[10px\] ml-1">MONTHLY MTD<\/span><\/div>/g,
  `<div className="mb-1 flex items-center gap-2"><span className="text-sm font-semibold text-slate-700">Loads</span><span className="text-[9px] leading-tight font-bold text-slate-400 uppercase tracking-wider w-14">MONTHLY MTD</span></div>`
);

content = content.replace(
  /<div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Vehicles <span className="text-\[10px\] ml-1">ACTIVE FLEET<\/span><\/div>/g,
  `<div className="mb-1 flex items-center gap-2"><span className="text-sm font-semibold text-slate-700">Vehicles</span><span className="text-[9px] leading-tight font-bold text-slate-400 uppercase tracking-wider w-14">ACTIVE FLEET</span></div>`
);

content = content.replace(
  /<div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Revenue <span className="text-\[10px\] ml-1">MONTHLY GROSS<\/span><\/div>/g,
  `<div className="mb-1 flex items-center gap-2"><span className="text-sm font-semibold text-slate-700">Revenue</span><span className="text-[9px] leading-tight font-bold text-slate-400 uppercase tracking-wider w-16">MONTHLY GROSS</span></div>`
);

content = content.replace(
  /<div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Branches <span className="text-\[10px\] ml-1">TOTAL DEPOTS<\/span><\/div>/g,
  `<div className="mb-1 flex items-center gap-2"><span className="text-sm font-semibold text-slate-700">Branches</span><span className="text-[9px] leading-tight font-bold text-slate-400 uppercase tracking-wider w-14">TOTAL DEPOTS</span></div>`
);

content = content.replace(
  /<div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Drivers <span className="text-\[10px\] ml-1">ACTIVE ROSTER<\/span><\/div>/g,
  `<div className="mb-1 flex items-center gap-2"><span className="text-sm font-semibold text-slate-700">Drivers</span><span className="text-[9px] leading-tight font-bold text-slate-400 uppercase tracking-wider w-14">ACTIVE ROSTER</span></div>`
);

fs.writeFileSync(path, content, "utf8");
console.log("Updated CompanyAdminDashboard.jsx");

