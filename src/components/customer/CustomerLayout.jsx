import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Zap, Bell, LogOut, Package, MapPin, FileText, User } from 'lucide-react';
import NotificationDropdown from '../common/NotificationDropdown';

const navigationLinks = [
  { to: '/customer', label: 'Acme Distribution', icon: Package, end: true },
  { to: '/customer/tracking', label: 'Live Tracking', icon: MapPin },
  { to: '/customer/invoices', label: 'My Invoices', icon: FileText },
  { to: '/customer/account', label: 'My Account', icon: User }
];

export default function CustomerLayout() {
  const navigate = useNavigate();
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col justify-between">
      {/* Header */}
      <header className="bg-white border-b border-slate-100 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between relative">
          <div className="flex items-center gap-2.5">
            <div 
              className="flex items-center gap-2.5 cursor-pointer"
              onClick={() => navigate('/customer')}
            >
              <div className="w-7 h-7 bg-[#FFB200] rounded-lg flex items-center justify-center shadow-[0_0_10px_rgba(255,204,0,0.2)]">
                <Zap size={14} color="#111" strokeWidth={3} />
              </div>
              <span className="font-black text-[#111] text-lg tracking-tighter uppercase">HERO</span>
            </div>
            <span className="w-px h-4 bg-slate-200 mx-1"></span>
            <span className="text-[10px] text-slate-450 font-bold uppercase tracking-widest">Customer Portal</span>
          </div>

          <nav className="hidden md:flex items-center gap-1.5">
            {navigationLinks.map(({ to, label, icon: Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-lg text-[10px] font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#FFB200] text-black shadow-xs'
                      : 'text-slate-550 hover:text-[#111] hover:bg-slate-100'
                  }`
                }
              >
                <Icon size={13} />
                <span>{label}</span>
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {/* Notification bell trigger */}
            <div className="relative">
              <button 
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative p-2 text-slate-400 hover:bg-slate-50 rounded-full transition-colors cursor-pointer block"
              >
                <Bell size={18} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>

              {notificationsOpen && (
                <NotificationDropdown 
                  onClose={() => setNotificationsOpen(false)}
                  onViewAll={() => {
                    setNotificationsOpen(false);
                    navigate('/customer/account');
                  }}
                />
              )}
            </div>

            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-700 text-xs shadow-inner overflow-hidden border border-slate-200">
              <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop" alt="Profile" className="w-full h-full object-cover" />
            </div>
            
            <button 
              onClick={() => navigate('/login')}
              className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-slate-400 hover:text-red-500 transition-colors ml-1 cursor-pointer"
            >
              <LogOut size={13} />
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8 flex-grow w-full">
        <Outlet />
      </main>
    </div>
  );
}
