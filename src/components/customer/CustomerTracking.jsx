import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { MapPin, ArrowRight, Clock, Navigation, Truck, FileText, Check, Download, Zap, Bell, LogOut } from 'lucide-react';

const Bu = [
  {
    id: 'SHP-9042',
    driver: 'James Mitchell',
    vehicle: 'NSW-456-XY',
    status: 'On the way to Melbourne',
    currentCity: 'Albury (NSW/VIC Border)',
    progress: 55,
    from: 'Sydney',
    to: 'Melbourne',
    phone: '0412 345 678',
    eta: 'Tomorrow, 4:00 PM',
    steps: [
      { city: 'Sydney CBD', label: 'Collected from Customer', done: true },
      { city: 'Sydney Depot', label: 'Processing at Depot', done: true },
      { city: 'Goulburn Depot', label: 'Departed Central Depot', done: true },
      { city: 'Albury', label: 'Inter-city Transit', current: true, done: false },
      { city: 'Melbourne Depot', label: 'Awaiting Arrival', done: false },
      { city: 'Melbourne CBD', label: 'Out for Delivery', done: false }
    ]
  },
  {
    id: 'SHP-9039',
    driver: 'Sarah Chen',
    vehicle: 'VIC-891-AB',
    status: 'Out for delivery',
    currentCity: 'Melbourne (St Kilda)',
    progress: 92,
    from: 'Melbourne Depot',
    to: 'St Kilda',
    phone: '0423 567 890',
    eta: 'Today, 2:30 PM',
    steps: [
      { city: 'Brisbane Depot', label: 'Line-haul Departed', done: true },
      { city: 'Melbourne Depot', label: 'Sorting at Depot', done: true },
      { city: 'Melbourne Depot', label: 'Staged for Delivery', done: true },
      { city: 'Melbourne CBD', label: 'With Courier', current: true, done: false }
    ]
  }
];

export default function CustomerTracking() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const idParam = searchParams.get('id') || 'SHP-9042';
  
  const [selectedLoad, setSelectedLoad] = useState(Bu[0]);

  useEffect(() => {
    const found = Bu.find(item => item.id === idParam);
    if (found) {
      setSelectedLoad(found);
    } else {
      // Mock it dynamically for any other ID
      setSelectedLoad({
        id: idParam,
        driver: 'James Mitchell',
        vehicle: 'NSW-456-XY',
        status: 'On the way to Melbourne',
        currentCity: 'Albury (NSW/VIC Border)',
        progress: 55,
        from: 'Sydney',
        to: 'Melbourne',
        phone: '0412 345 678',
        eta: 'Tomorrow, 4:00 PM',
        steps: [
          { city: 'Sydney CBD', label: 'Collected from Customer', done: true },
          { city: 'Sydney Depot', label: 'Processing at Depot', done: true },
          { city: 'Goulburn Depot', label: 'Departed Central Depot', done: true },
          { city: 'Albury', label: 'Inter-city Transit', current: true, done: false },
          { city: 'Melbourne Depot', label: 'Awaiting Arrival', done: false },
          { city: 'Melbourne CBD', label: 'Out for Delivery', done: false }
        ]
      });
    }
  }, [idParam]);

  return (
    <div className="flex flex-col gap-6">
          
          {/* Page Heading */}
          <div className="text-left">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Live Tracking</h1>
            <p className="text-xs font-semibold text-slate-550 mt-1">{Bu.length} active Loads</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left Column: Active Shipment List */}
            <div className="lg:col-span-1 flex flex-col gap-3">
              {Bu.map((loadItem) => (
                <button
                  key={loadItem.id}
                  onClick={() => setSelectedLoad(loadItem)}
                  className={`bg-white rounded-2xl border p-4 text-left transition-all w-full cursor-pointer ${
                    selectedLoad.id === loadItem.id
                      ? 'border-[#FFB200] shadow-md ring-1 ring-[#FFB200]/20'
                      : 'border-slate-150 hover:border-slate-250 hover:shadow-xs'
                  }`}
                >
                  <p className="font-extrabold text-slate-900 text-sm font-mono">{loadItem.id}</p>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold mt-1">
                    <MapPin size={11} className="text-slate-400" />
                    <span>{loadItem.from}</span>
                    <ArrowRight size={10} className="text-slate-400" />
                    <span>{loadItem.to}</span>
                  </div>
                  
                  <div className="flex justify-between items-center mt-3.5">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-700 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-md">
                      {loadItem.status}
                    </span>
                    <span className="text-[10px] text-slate-450 font-bold flex items-center gap-1">
                      <Clock size={11} /> ETA {loadItem.eta}
                    </span>
                  </div>

                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mt-3 border border-slate-200/50">
                    <div 
                      className="h-full bg-gradient-to-r from-[#FFB200] to-[#FF8C00] rounded-full transition-all duration-500" 
                      style={{ width: `${loadItem.progress}%` }}
                    />
                  </div>
                </button>
              ))}
            </div>

            {/* Right Column: Tracking Map & Stepper */}
            <div className="lg:col-span-2 flex flex-col gap-5">
              
              {/* Map Visual Panel */}
              <div className="bg-gradient-to-br from-[#1E293B] via-[#0F172A] to-[#020617] rounded-3xl h-72 flex items-center justify-center relative overflow-hidden shadow-md border border-slate-800">
                <div 
                  className="absolute inset-0 opacity-15"
                  style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)',
                    backgroundSize: '30px 30px'
                  }}
                />
                
                {/* Route Line */}
                <svg className="absolute w-full h-full pointer-events-none opacity-20">
                  <path d="M 280 135 Q 400 120, 520 160" fill="transparent" stroke="white" strokeWidth="2" strokeDasharray="5,5" />
                </svg>

                {/* Origin Pin */}
                <div className="absolute" style={{ top: '45%', left: '35%' }}>
                  <div className="w-6 h-6 bg-emerald-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                    <MapPin size={12} color="white" />
                  </div>
                  <div className="bg-slate-900 text-white text-[10px] font-black px-2 py-0.5 rounded-md shadow mt-1 whitespace-nowrap uppercase tracking-wider">
                    {selectedLoad.from}
                  </div>
                </div>

                {/* Destination Pin */}
                <div className="absolute" style={{ top: '55%', right: '30%' }}>
                  <div className="w-6 h-6 bg-red-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                    <MapPin size={12} color="white" />
                  </div>
                  <div className="bg-slate-900 text-white text-[10px] font-black px-2 py-0.5 rounded-md shadow mt-1 whitespace-nowrap uppercase tracking-wider">
                    {selectedLoad.to}
                  </div>
                </div>

                {/* Blinking Truck Icon */}
                <div className="absolute" style={{ top: '48%', left: '52%' }}>
                  <div className="w-10 h-10 bg-[#FFB200] rounded-full border-4 border-white shadow-2xl flex items-center justify-center animate-pulse">
                    <Truck size={18} color="#000" />
                  </div>
                </div>

                {/* Live GPS badge */}
                <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-xs text-white text-[10px] font-black px-2.5 py-1 rounded-md flex items-center gap-1.5 uppercase tracking-wider border border-white/10">
                  <Navigation size={12} style={{ color: '#ffffff', fill: '#ffffff' }} />
                  <span style={{ color: '#ffffff' }}>GPS LIVE · Updated 30s ago</span>
                </div>
              </div>

              {/* Steps Timeline Card */}
              <div className="bg-white rounded-3xl border border-slate-150 shadow-sm overflow-hidden text-left">
                
                {/* Header */}
                <div className="p-6 border-b border-slate-100 flex justify-between items-start bg-slate-50/50">
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-xl tracking-tight font-mono">{selectedLoad.id}</h3>
                    <p className="text-[10px] font-extrabold text-slate-400 mt-1.5 uppercase tracking-widest flex items-center gap-1.5">
                      <MapPin size={11} className="text-[#FFB200]" />
                      <span>{selectedLoad.from}</span>
                      <span className="text-slate-300">→</span>
                      <span>{selectedLoad.to}</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-black bg-[#FFB200] text-[10px] font-black uppercase tracking-wider px-3.5 py-1.5 rounded-xl shadow-md shadow-[#FFB200]/10">
                      {selectedLoad.status}
                    </span>
                    <div className="mt-3 flex flex-col items-end">
                      <p className="text-[10px] font-black text-[#FFB200] uppercase tracking-widest">Active Node</p>
                      <p className="text-xs font-bold text-slate-900 mt-0.5">{selectedLoad.currentCity}</p>
                    </div>
                  </div>
                </div>

                {/* Timeline Body */}
                <div className="p-8 bg-white">
                  <div className="relative space-y-8">
                    <div className="absolute left-2.5 top-2 bottom-2 w-0.5 bg-slate-100" />
                    
                    {selectedLoad.steps.map((step, idx) => (
                      <div key={idx} className="flex gap-6 relative group">
                        
                        {/* Bullet circle */}
                        <div className={`w-5 h-5 rounded-full border-2 z-10 shrink-0 flex items-center justify-center transition-all duration-500 ${
                          step.done
                            ? 'bg-emerald-500 border-emerald-100 scale-105 shadow-sm text-white'
                            : step.current
                              ? 'bg-[#FFB200] border-amber-200 animate-pulse scale-125 shadow-md shadow-[#FFB200]/30 text-black'
                              : 'bg-white border-slate-200 opacity-30 shadow-inner'
                        }`}>
                          {step.done && <Check size={10} strokeWidth={3} />}
                        </div>

                        {/* Step Details block */}
                        <div className={`flex-grow transition-all duration-500 ${
                          step.done 
                            ? 'opacity-65' 
                            : step.current 
                              ? 'opacity-100' 
                              : 'opacity-30'
                        }`}>
                          <div className="flex justify-between items-center">
                            <p className={`text-[10px] font-extrabold uppercase tracking-widest ${
                              step.current ? 'text-amber-700' : 'text-slate-400'
                            }`}>{step.city}</p>
                            {step.done && (
                              <span className="text-[9px] font-black text-emerald-600 bg-emerald-50 border border-emerald-100 px-1.5 py-0.5 rounded uppercase tracking-wider">
                                Scanned
                              </span>
                            )}
                          </div>

                          <div className={`mt-2 p-4 rounded-2xl border transition-all ${
                            step.current
                              ? 'bg-slate-900 border-slate-800 shadow-xl translate-x-1 text-white'
                              : 'bg-slate-50/50 border-slate-100 text-slate-800'
                          }`}>
                            <p className="text-xs font-bold leading-tight">{step.label}</p>
                            {step.current && (
                              <p className="text-[10px] font-medium text-slate-400 mt-2 leading-relaxed">
                                Our automated sorting facility is preparing this parcel for the next inter-city line-haul truck.
                              </p>
                            )}
                          </div>
                        </div>

                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer specs */}
                <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400 shadow-xs">
                      <Truck size={18} />
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">In Transit via Depot</p>
                      <p className="text-xs font-bold text-slate-800 mt-0.5">Consolidated Loading</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Network Speed</p>
                    <p className="text-xs font-extrabold text-emerald-600 uppercase tracking-wider mt-0.5">Standard Express</p>
                  </div>
                </div>

                {/* Live Feed Banner */}
                <div className="p-3 bg-black text-[#FFB200] text-[9px] font-black uppercase tracking-[0.25em] text-center flex items-center justify-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFB200] animate-pulse" />
                  <span>Australian Logistics Network Live Feed</span>
                </div>

              </div>

            </div>

          </div>

        </div>
  );
}
