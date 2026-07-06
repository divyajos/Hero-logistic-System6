import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Truck, Navigation, AlertTriangle, ArrowRight, Wallet, CheckCircle, Plus, Clock } from 'lucide-react';

const activeFlowLoads = [
  { id: 'SHP-9042', origin: 'Sydney Terminal', dest: 'Melbourne Depot', status: 'In Transit', progress: 65, alert: false, type: 'Freight', eta: '5:30 PM' },
  { id: 'SHP-9048', origin: 'Melbourne WH-B', dest: 'Adelaide Port', status: 'At Pickup', progress: 15, alert: false, type: 'LTL', eta: '9:00 AM' },
  { id: 'SHP-9031', origin: 'Brisbane Depot', dest: 'Sydney Terminal', status: 'Delayed +45m', progress: 45, alert: true, type: 'Express', eta: '7:15 PM' }
];

export default function CustomerHome() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-8 w-full max-w-7xl mx-auto text-left pb-12">
      {/* Acme Distribution Group Banner */}
      <div className="bg-[#0f172a] rounded-3xl p-10 text-white relative overflow-hidden shadow-2xl border border-slate-800">
        <div className="absolute right-0 top-0 w-80 h-80 bg-[#FFB200]/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <p className="text-[#FFB200] text-[10px] font-black tracking-[0.3em] uppercase mb-3">Certified Partner Dashboard</p>
            <h1 className="text-4xl font-black tracking-tight leading-none">Acme Distribution Group</h1>
            <div className="flex items-center gap-4 mt-6">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((num) => (
                  <div key={num} className="w-8 h-8 rounded-full border-2 border-[#0f172a] bg-slate-800 flex items-center justify-center font-extrabold text-[10px] text-slate-400">
                    U{num}
                  </div>
                ))}
              </div>
              <p className="text-xs font-semibold text-slate-400">Manage 14 team members · Level 4 Tier</p>
            </div>
          </div>

          <div className="flex flex-col gap-4 w-full md:w-auto">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10 shadow-inner">
                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block mb-1">Active Loads</span>
                <span className="text-2xl font-black text-[#FFB200]">03</span>
              </div>
              <div className="bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10 shadow-inner">
                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block mb-1">Monthly Volume</span>
                <span className="text-2xl font-black text-white">412</span>
              </div>
            </div>
            <button 
              onClick={() => navigate('/customer/tracking')}
              className="btn bg-[#FFB200] hover:bg-[#E68A00] text-black py-3.5 px-8 rounded-2xl font-extrabold uppercase text-xs tracking-widest shadow-lg shadow-[#FFB200]/10 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.98]"
            >
              <Navigation size={14} className="fill-black" />
              <span>Live Fleet HUD</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Side: Active Logistics Flow */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight">Active Logistics Flow</h2>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Real-time status updates from fleet</p>
            </div>
            <button 
              onClick={() => navigate('/customer/tracking')}
              className="text-xs font-extrabold text-[#FFB200] hover:text-[#E68A00] uppercase tracking-wider hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Full Tracking View</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {activeFlowLoads.map((load) => (
              <div
                key={load.id}
                onClick={() => navigate('/customer/tracking?id=' + load.id)}
                className={`bg-white rounded-[2rem] border p-6 flex flex-col gap-6 hover:shadow-xl transition-all cursor-pointer group active:scale-[0.98] ${
                  load.alert 
                    ? 'border-red-100 bg-red-50/10' 
                    : 'border-slate-100 hover:border-slate-250'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center border shadow-xs shrink-0 ${
                      load.alert 
                        ? 'bg-red-50 text-red-500 border-red-100' 
                        : 'bg-slate-50 text-slate-400 border-slate-100'
                    }`}>
                      <Truck size={18} />
                    </div>
                    <div>
                      <p className="font-extrabold text-slate-900 text-sm font-mono leading-tight">{load.id}</p>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mt-0.5">{load.type}</span>
                    </div>
                  </div>
                  <span className={`text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full border ${
                    load.status.toLowerCase().includes('deliv')
                      ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                      : load.alert
                        ? 'bg-red-50 text-red-500 border-red-200 animate-pulse'
                        : 'bg-blue-50 text-blue-600 border-blue-100'
                  }`}>
                    {load.status}
                  </span>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-350 shrink-0" />
                    <p className="text-xs font-bold text-slate-600 truncate">{load.origin}</p>
                  </div>
                  <div className="w-px h-3 bg-slate-150 ml-[0.25rem] -my-1" />
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#FFB200] shadow-xs shrink-0" />
                    <p className="text-xs font-bold text-slate-800 truncate">{load.dest}</p>
                  </div>
                </div>

                <div className="mt-auto pt-2">
                  <div className="flex justify-between items-end mb-2 text-xs">
                    <span className="text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <Clock size={12} /> Progress
                    </span>
                    <span className="text-slate-800 font-bold">ETA: {load.eta}</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200/50">
                    <div 
                      className={`h-full transition-all duration-1000 ${
                        load.alert ? 'bg-red-500' : 'bg-[#FFB200]'
                      }`}
                      style={{ width: `${load.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}

            <div 
              onClick={() => navigate('/customer/invoices')}
              className="bg-slate-50/50 border-2 border-dashed border-slate-200 rounded-[2rem] p-6 flex flex-col items-center justify-center text-center gap-4 hover:bg-slate-50 transition-colors cursor-pointer group"
            >
              <div className="w-12 h-12 bg-white border border-slate-150 rounded-2xl flex items-center justify-center text-slate-300 group-hover:text-[#FFB200] group-hover:scale-105 transition-all shadow-xs">
                <Plus size={24} />
              </div>
              <div>
                <p className="text-xs font-extrabold text-slate-800 uppercase tracking-wider leading-tight">Need another load?</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Instant Manifest Creation</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Billing & Support cards */}
        <div className="space-y-6">
          {/* Outstanding Balance card */}
          <div className="bg-white rounded-[2.5rem] border border-red-100 p-8 shadow-xl shadow-red-500/5 flex flex-col gap-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4">
              <AlertTriangle className="text-red-500 opacity-10 shrink-0" size={48} />
            </div>
            <div>
              <h3 className="text-[10px] font-extrabold text-red-500 uppercase tracking-[0.15em] mb-4 flex items-center gap-2">
                <AlertTriangle size={14} />
                <span>Outstanding Balance</span>
              </h3>
              <p className="text-4xl font-black text-slate-900 tracking-tight">$4,887.50</p>
              <p className="text-xs font-semibold text-slate-400 mt-2">Across 3 Unpaid Invoices</p>
            </div>
            <button 
              onClick={() => navigate('/customer/invoices')}
              className="w-full bg-slate-950 hover:bg-black text-[#FFB200] py-4 rounded-2xl font-extrabold uppercase text-xs tracking-widest transition-all active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <span>Resolve Now</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* Concierge Support card */}
          <div className="bg-slate-50 border border-slate-200/60 rounded-[2.5rem] p-8 flex flex-col gap-6">
            <h3 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-[0.15em] mb-2">Concierge Support</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4 bg-white p-4 border border-slate-100 rounded-3xl shadow-sm">
                <div className="w-10 h-10 rounded-2xl bg-blue-500 flex items-center justify-center text-white shrink-0">
                  <CheckCircle size={20} />
                </div>
                <div>
                  <p className="text-xs font-extrabold text-slate-900 uppercase">Live Assistance</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase mt-0.5">Average response: 2m</p>
                </div>
              </div>
              <button 
                onClick={() => window.open('tel:1300000000')}
                className="w-full py-3.5 text-xs font-extrabold text-slate-800 uppercase tracking-widest border-2 border-slate-200 rounded-2xl hover:bg-white hover:border-slate-300 transition-all cursor-pointer"
              >
                Open Helpline
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
