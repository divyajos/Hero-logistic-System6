import React, { useState } from 'react';
import { ChevronLeft, Save, Plus, Shield, Box, Car, AlertTriangle, Package, Zap, Info } from 'lucide-react';

export default function EditJobPanel({ loadId = 'SHP-20481', onClose, onSave }) {
  const [refNum, setRefNum] = useState('ACME-221');
  const [deptCode, setDeptCode] = useState('');
  const [origin, setOrigin] = useState('Sydney Depot');
  const [destination, setDestination] = useState('Melbourne Branch');
  const [priority, setPriority] = useState('HIGH');

  const [cargoItems, setCargoItems] = useState([
    { id: 1, type: 'vehicle', vin: '7T1...882', registration: 'XQG-984', makeModel: 'Toyota Hilux', stockItem: 'STK-4405' }
  ]);

  const handleAddItem = () => {
    setCargoItems([
      ...cargoItems,
      {
        id: Date.now(),
        type: 'vehicle',
        vin: '',
        registration: '',
        makeModel: '',
        stockItem: ''
      }
    ]);
  };

  const handleUpdateItem = (id, fields) => {
    setCargoItems(cargoItems.map(item => item.id === id ? { ...item, ...fields } : item));
  };

  const handleRemoveItem = (id) => {
    if (cargoItems.length > 1) {
      setCargoItems(cargoItems.filter(item => item.id !== id));
    }
  };

  const handleCommit = () => {
    onSave({
      loadId,
      refNum,
      deptCode,
      cargoItems,
      origin,
      destination,
      priority
    });
  };

  return (
    <div className="w-full max-w-[1440px] mx-auto pb-16 text-left animate-fade-in font-sans">
      
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div className="flex items-center gap-4">
          <button
            onClick={onClose}
            className="w-10 h-10 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-700 hover:bg-slate-50 transition-colors shadow-xs cursor-pointer outline-none"
          >
            <ChevronLeft size={18} />
          </button>
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                Edit Job <span className="text-[#FFB200]">{loadId}</span>
              </h1>
              <span className="bg-blue-50 border border-blue-100 text-blue-600 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md">
                Command Overwrite
              </span>
            </div>
            <p className="text-xs font-semibold text-slate-450 mt-1">Adjusting operational manifest & shipment flow</p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={onClose}
            className="flex-1 sm:flex-none px-6 py-2.5 bg-white border border-slate-205 text-slate-800 font-extrabold text-xs uppercase tracking-widest rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
          >
            Discard
          </button>
          <button
            onClick={handleCommit}
            className="flex-1 sm:flex-none px-6 py-2.5 bg-slate-950 hover:bg-black text-[#FFB200] font-extrabold text-xs uppercase tracking-widest rounded-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer shadow-md"
          >
            <Save size={14} />
            <span>Commit Changes</span>
          </button>
        </div>
      </div>

      {/* Main Form Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Columns (lg:col-span-2) */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* Card 1: Administrative References */}
          <div className="bg-white rounded-3xl border border-slate-150 p-6 shadow-xs">
            <div className="flex items-start gap-3.5 mb-6">
              <div className="w-9 h-9 rounded-xl bg-purple-50 flex items-center justify-center text-purple-650 shrink-0">
                <Shield size={16} />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-850 text-sm tracking-wide uppercase leading-tight">Administrative References</h3>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Billing & Compliance Identifiers</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block mb-1.5">Customer Load Number (Ref #) *</label>
                <input
                  type="text"
                  value={refNum}
                  onChange={(e) => setRefNum(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-205 focus:border-[#FFB200] text-slate-850 text-xs font-bold rounded-xl px-4 py-3 focus:outline-none"
                  placeholder="e.g. ACME-221"
                />
              </div>
              <div>
                <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block mb-1.5">Internal Dept. Code</label>
                <input
                  type="text"
                  value={deptCode}
                  onChange={(e) => setDeptCode(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-205 focus:border-[#FFB200] text-slate-850 text-xs font-bold rounded-xl px-4 py-3 focus:outline-none"
                  placeholder="Optional cost center"
                />
              </div>
            </div>
          </div>

          {/* Card 2: Shipment Manifest */}
          <div className="bg-white rounded-3xl border border-slate-150 p-6 shadow-xs flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                  <Box size={16} />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-850 text-sm tracking-wide uppercase leading-tight">Shipment Manifest</h3>
                </div>
              </div>
              <button 
                onClick={handleAddItem}
                className="px-4 py-1.5 bg-slate-950 hover:bg-black text-[#FFB200] text-[10px] font-black uppercase tracking-wider rounded-full flex items-center gap-1 cursor-pointer transition-all active:scale-95 border-none outline-none"
              >
                <Plus size={12} strokeWidth={3} /> Add Item
              </button>
            </div>

            {/* List of Cargo Details */}
            <div className="space-y-6">
              {cargoItems.map((item, index) => (
                <div key={item.id} className="border border-slate-150 rounded-2xl p-5 text-left relative bg-slate-50/20">
                  <div className="flex justify-between items-center mb-5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-5 h-5 bg-slate-900 text-white rounded-md flex items-center justify-center font-extrabold text-[10px] font-mono">
                        {index + 1}
                      </div>
                      <span className="text-[10px] font-black text-slate-855 uppercase tracking-widest">Cargo Detail</span>
                    </div>
                    {cargoItems.length > 1 && (
                      <button 
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-[10px] font-extrabold text-red-500 hover:text-red-700 uppercase tracking-wider cursor-pointer border-none bg-transparent"
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  {/* Cargo Tab Selectors */}
                  <div className="grid grid-cols-3 gap-2 mb-6">
                    {[
                      { id: 'vehicle', label: 'Vehicle', icon: Car },
                      { id: 'hazmat', label: 'Hazmat', icon: AlertTriangle },
                      { id: 'freight', label: 'Freight', icon: Package }
                    ].map((tab) => {
                      const isActive = item.type === tab.id;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => handleUpdateItem(item.id, { type: tab.id })}
                          className={`py-3.5 px-4 rounded-xl border font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                            isActive
                              ? 'border-blue-550 bg-blue-50/20 text-blue-600 shadow-sm ring-1 ring-blue-500/10'
                              : 'border-slate-150 bg-white text-slate-500 hover:text-slate-800'
                          }`}
                        >
                          <tab.icon size={14} />
                          <span>{tab.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Cargo Inputs Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block mb-1.5">VIN / Chassis # *</label>
                      <input
                        type="text"
                        value={item.vin}
                        onChange={(e) => handleUpdateItem(item.id, { vin: e.target.value })}
                        placeholder="e.g. 7T1882..."
                        className="w-full bg-slate-50 border border-slate-205 focus:border-[#FFB200] text-slate-850 text-xs font-bold rounded-xl px-4 py-3 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block mb-1.5">Registration #</label>
                      <input
                        type="text"
                        value={item.registration}
                        onChange={(e) => handleUpdateItem(item.id, { registration: e.target.value })}
                        placeholder="e.g. XQG-984"
                        className="w-full bg-slate-50 border border-slate-205 focus:border-[#FFB200] text-slate-850 text-xs font-bold rounded-xl px-4 py-3 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block mb-1.5">Make / Model</label>
                      <input
                        type="text"
                        value={item.makeModel}
                        onChange={(e) => handleUpdateItem(item.id, { makeModel: e.target.value })}
                        placeholder="e.g. Toyota Hilux"
                        className="w-full bg-slate-50 border border-slate-205 focus:border-[#FFB200] text-slate-850 text-xs font-bold rounded-xl px-4 py-3 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block mb-1.5">Stock / Item # *</label>
                      <input
                        type="text"
                        value={item.stockItem}
                        onChange={(e) => handleUpdateItem(item.id, { stockItem: e.target.value })}
                        placeholder="e.g. STK-4405"
                        className="w-full bg-slate-50 border border-slate-205 focus:border-[#FFB200] text-slate-850 text-xs font-bold rounded-xl px-4 py-3 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side Column */}
        <div className="flex flex-col gap-6">
          
          {/* Card 3: Routing Override */}
          <div className="bg-[#111] text-white rounded-3xl p-6 shadow-md border border-slate-800">
            <div className="flex items-center gap-2 mb-6">
              <Zap size={14} className="text-[#FFB200] fill-[#FFB200]" />
              <h3 className="text-[10px] font-black text-[#FFB200] uppercase tracking-[0.2em]">Routing Override</h3>
            </div>

            <div className="space-y-5 relative">
              <div className="absolute left-[7px] top-3.5 bottom-16 w-0.5 bg-white/40" />
              
              <div>
                <label className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest block mb-2 flex items-center gap-1.5 relative z-10">
                  <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 flex items-center justify-center shrink-0" />
                  <span>Origin Location</span>
                </label>
                <input
                  type="text"
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  className="w-[calc(100%-28px)] bg-white text-slate-900 text-xs font-bold rounded-2xl px-4 py-3.5 focus:outline-none ml-7 mt-1 border border-transparent focus:border-[#FFB200]"
                />
              </div>

              <div>
                <label className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest block mb-2 flex items-center gap-1.5 relative z-10">
                  <div className="w-3.5 h-3.5 rounded-full bg-amber-500 flex items-center justify-center shrink-0" />
                  <span>Final Destination</span>
                </label>
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-[calc(100%-28px)] bg-white text-slate-900 text-xs font-bold rounded-2xl px-4 py-3.5 focus:outline-none ml-7 mt-1 border border-transparent focus:border-[#FFB200]"
                />
              </div>

              <div className="pt-2">
                <label className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest block mb-2">Priority Status</label>
                <div className="bg-[#1b1b1b] rounded-xl p-1 grid grid-cols-3 gap-1">
                  {['LOW', 'MEDIUM', 'HIGH'].map((p) => {
                    const isActive = priority === p;
                    return (
                      <button
                        key={p}
                        onClick={() => setPriority(p)}
                        className={`py-2 rounded-lg text-[9px] font-black tracking-wider uppercase transition-all cursor-pointer ${
                          isActive
                            ? 'bg-[#FFB200] shadow-md'
                            : ''
                        }`}
                        style={{ color: isActive ? '#000000' : '#ffffff' }}
                      >
                        {p}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Card 4: Modification Summary */}
          <div className="bg-white rounded-3xl border border-slate-150 p-6 shadow-xs flex flex-col gap-5">
            <h3 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Modification Summary</h3>
            
            <div className="flex justify-between items-center text-xs font-bold border-b border-slate-100 pb-3.5">
              <span className="text-slate-500">Items to Process</span>
              <span className="text-slate-850 font-mono">{cargoItems.length}</span>
            </div>

            <div className="flex justify-between items-center text-xs font-bold border-b border-slate-100 pb-3.5">
              <span className="text-slate-500">Job Reference</span>
              <span className="bg-[#FFB200]/10 border border-[#FFB200]/30 text-amber-800 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md">
                Active Link
              </span>
            </div>

            {/* Warning Banner */}
            <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-4 flex gap-3 text-left">
              <Info className="text-blue-550 shrink-0 mt-0.5" size={15} />
              <p className="text-[9px] font-black text-blue-600 uppercase tracking-wider leading-relaxed">
                Updates will sync to the driver's device immediately upon saving.
              </p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
