import os
import re

file_path = r"c:\Users\divya\OneDrive\Desktop\Hero-logistic-system-26\hero-logistics-system\src\components\dashboards\CompanyAdminDashboard.jsx"
output_dir = r"c:\Users\divya\OneDrive\Desktop\Hero-logistic-system-26\hero-logistics-system\src\pages\company-admin"

components = {
    "VehiclesDashboardView": "VehiclesPage",
    "BranchesDashboardView": "BranchesPage",
    "DriversDashboardView": "DriversPage",
    "CustomersDashboardView": "CustomersPage",
    "AssetInventoryDashboardView": "AssetInventoryPage",
    "SafetyChecklistsDashboardView": "SafetyChecklistsPage",
    "ExceptionsDashboardView": "ExceptionsPage",
    "FinanceDashboardView": "FinancePage",
    "UserRolesDashboardView": "UserRolesPage",
    "SupportDashboardView": "SupportPage",
    "CompanySettingsDashboardView": "CompanySettingsPage",
    "BillingDashboardView": "BillingPage",
    "MyProfileDashboardView": "MyProfilePage"
}

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Shared imports template
imports = """import React from 'react';
import {
  Package, Truck, DollarSign, Globe, Users, Box, Zap, Activity,
  Plus, SlidersHorizontal, Search, FileText, AlertCircle, CheckCircle2, UserCheck,
  Truck as TruckIcon, MapPin, Trash2, ChevronLeft, Camera, Upload, Clock,
  Wrench, Shield, Droplet, List, Grid, X, UserPlus, Clipboard, Star, Edit, Building, Store, ShieldAlert,
  Power, Settings, User, RotateCcw, RefreshCw, Check,
  TrendingUp, TrendingDown, CreditCard, BarChart2, PieChart, ArrowUpRight, ArrowDownRight,
  Download, Eye, Lock, Unlock, MoreVertical, Mail, Phone, Calendar,
  Key, Save, ChevronRight, ChevronDown as ChevronDownIcon, Bell, MessageSquare
} from 'lucide-react';
"""

keys = list(components.keys())

for i, comp_name in enumerate(keys):
    page_name = components[comp_name]
    
    # Find start
    start_match = re.search(r'const\s+' + comp_name + r'\s*=\s*(?:\([^)]*\)|)\s*=>\s*\{', content)
    if not start_match:
        print(f"Could not find {comp_name}")
        continue
    
    start_idx = start_match.start()
    
    # Find end (start of next component, or start of the main default export)
    if i < len(keys) - 1:
        next_comp = keys[i+1]
        end_match = re.search(r'// =+ ' + r'|const\s+' + next_comp + r'\s*=', content[start_idx+1:])
        if end_match:
            end_idx = start_idx + 1 + end_match.start()
        else:
            end_idx = len(content)
    else:
        end_match = re.search(r'export default function\s+CompanyAdminDashboard', content[start_idx:])
        if end_match:
            end_idx = start_idx + end_match.start()
        else:
            end_idx = len(content)
            
    comp_code = content[start_idx:end_idx].strip()
    
    # Replace `const CompName = ...` with `export default function PageName() { ... }` (if it's simple)
    # OR we can just append `export default CompName;`
    
    final_code = imports + "\n" + comp_code + f"\n\nexport default {comp_name};\n"
    
    with open(os.path.join(output_dir, f"{page_name}.jsx"), "w", encoding="utf-8") as out_f:
        out_f.write(final_code)
    
    print(f"Extracted {page_name}")
