import React, { useState } from 'react';
import { Building2, Mail, Phone, MapPin, Shield, HelpCircle } from 'lucide-react';

export default function CustomerAccount() {
  const [preferences, setPreferences] = useState({
    sms: true,
    confirmEmail: true,
    invoiceEmail: true,
    reminderEmail: false
  });

  const handleToggle = (key) => {
    setPreferences({ ...preferences, [key]: !preferences[key] });
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto text-left pb-12">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">My Account</h1>
        <p className="text-xs font-semibold text-slate-450 mt-1">Woolworths Group Logistics</p>
      </div>

      {/* Company Details Card */}
      <div className="bg-white rounded-3xl border border-slate-150 shadow-sm p-6">
        <h3 className="font-extrabold text-slate-900 text-sm uppercase tracking-wider mb-5">Company Details</h3>
        
        <div className="space-y-4">
          {[
            { label: 'Company Name', value: 'Woolworths Group Logistics', icon: Building2 },
            { label: 'Email', value: 'logistics@woolworths.com.au', icon: Mail },
            { label: 'Phone', value: '+61 2 8888 0000', icon: Phone },
            { label: 'Address', value: '1 Woolworths Way, Bella Vista NSW 2153', icon: MapPin }
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                <item.icon size={18} className="text-slate-400" />
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">{item.label}</p>
                <p className="text-xs font-bold text-slate-800 mt-0.5">{item.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-5 border-t border-slate-100 flex flex-wrap gap-6 items-center justify-between">
          <div className="flex gap-8">
            <div>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Credit Limit</p>
              <p className="font-extrabold text-slate-800 mt-0.5 text-base">$50,000 AUD</p>
            </div>
            <div>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Payment Terms</p>
              <p className="font-black text-slate-900 mt-0.5 text-base">Net 30 days</p>
            </div>
          </div>
          <button className="px-5 py-2.5 bg-slate-900 hover:bg-black text-[#FFB200] font-extrabold text-xs uppercase tracking-widest rounded-xl transition-all cursor-pointer shadow-sm">
            Edit Details
          </button>
        </div>
      </div>

      {/* Notification Preferences Card */}
      <div className="bg-white rounded-3xl border border-slate-150 shadow-sm p-6">
        <h3 className="font-extrabold text-slate-900 text-sm uppercase tracking-wider mb-5">Notification Preferences</h3>
        
        <div className="space-y-4">
          {[
            { key: 'sms', label: 'Load status SMS' },
            { key: 'confirmEmail', label: 'Delivery confirmation email' },
            { key: 'invoiceEmail', label: 'Invoice email' },
            { key: 'reminderEmail', label: 'Payment reminder email' }
          ].map((pref) => (
            <div key={pref.key} className="flex justify-between items-center py-1">
              <span className="text-xs font-bold text-slate-700">{pref.label}</span>
              <button
                onClick={() => handleToggle(pref.key)}
                className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer outline-none ${
                  preferences[pref.key] ? 'bg-[#FFB200]' : 'bg-slate-200'
                }`}
              >
                <div 
                  className={`w-5 h-5 bg-white rounded-full absolute top-0.5 shadow-xs transition-all duration-200 ${
                    preferences[pref.key] ? 'right-0.5' : 'left-0.5'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
