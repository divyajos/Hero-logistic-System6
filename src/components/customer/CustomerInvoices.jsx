import React, { useState } from 'react';
import { CreditCard, FileText, CheckCircle, Download, ArrowLeft } from 'lucide-react';

const initialInvoices = [
  { id: 'INV-2026-1238', job: 'J-2026-1248', amount: '$980.50', due: '15 Apr 2026', status: 'unpaid', issued: '16 Mar' },
  { id: 'INV-2026-1225', job: 'J-2026-1240', amount: '$2,037.20', due: '10 Apr 2026', status: 'unpaid', issued: '11 Mar' },
  { id: 'INV-2026-1195', job: 'J-2026-1195', amount: '$3,120.00', due: '5 Mar 2026', status: 'paid', issued: '3 Feb' },
  { id: 'INV-2026-1180', job: 'J-2026-1180', amount: '$620.00', due: '28 Feb 2026', status: 'paid', issued: '29 Jan' }
];

export default function CustomerInvoices() {
  const [invoices, setInvoices] = useState(initialInvoices);
  const [activePaymentId, setActivePaymentId] = useState(null);
  const [paidIds, setPaidIds] = useState([]);
  
  const handlePayInvoice = (id) => {
    setActivePaymentId(id);
  };

  const handleProcessPayment = (id) => {
    setPaidIds([...paidIds, id]);
    setInvoices(invoices.map(inv => inv.id === id ? { ...inv, status: 'paid' } : inv));
  };

  const selectedPayInvoice = invoices.find(inv => inv.id === activePaymentId);

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto text-left pb-12">
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight">My Invoices</h1>
        <p className="text-xs font-semibold text-slate-450 mt-1">
          {invoices.filter(e => e.status === 'unpaid').length} outstanding
        </p>
      </div>

      {activePaymentId && selectedPayInvoice ? (
        // Stripe Payment Form Screen
        <div className="max-w-lg mx-auto w-full">
          <button 
            onClick={() => setActivePaymentId(null)}
            className="text-xs font-extrabold text-slate-500 hover:text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-1.5 cursor-pointer"
          >
            <ArrowLeft size={14} />
            <span>Back to Invoices</span>
          </button>
          
          <div className="bg-white rounded-3xl border border-slate-150 shadow-md p-8">
            <h2 className="text-xl font-black text-slate-900 mb-1">Pay Invoice</h2>
            <p className="text-xs font-mono text-slate-450 mb-6">{selectedPayInvoice.id}</p>
            
            <div className="bg-slate-50 rounded-2xl p-5 mb-6 flex justify-between items-center border border-slate-100">
              <span className="text-slate-600 font-bold text-xs">Amount Due</span>
              <span className="text-2xl font-black text-slate-900">{selectedPayInvoice.amount}</span>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-extrabold text-slate-700 uppercase tracking-wider block mb-1.5">Card Number</label>
                <input className="w-full bg-slate-50 border border-slate-205 focus:border-[#FFB200] text-slate-800 text-xs font-semibold font-mono rounded-xl px-4 py-3 focus:outline-none" defaultValue="4242 4242 4242 4242" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-extrabold text-slate-700 uppercase tracking-wider block mb-1.5">Expiry</label>
                  <input className="w-full bg-slate-50 border border-slate-205 focus:border-[#FFB200] text-slate-800 text-xs font-semibold rounded-xl px-4 py-3 focus:outline-none" defaultValue="12/28" />
                </div>
                <div>
                  <label className="text-[10px] font-extrabold text-slate-700 uppercase tracking-wider block mb-1.5">CVV</label>
                  <input className="w-full bg-slate-50 border border-slate-205 focus:border-[#FFB200] text-slate-800 text-xs font-semibold rounded-xl px-4 py-3 focus:outline-none" defaultValue="123" />
                </div>
              </div>
            </div>

            {paidIds.includes(selectedPayInvoice.id) ? (
              <div className="mt-6 bg-emerald-50 border border-emerald-100 rounded-2xl p-5 text-center flex flex-col items-center justify-center gap-2">
                <CheckCircle size={32} className="text-emerald-500" />
                <p className="font-extrabold text-emerald-800 text-sm">Payment Successful!</p>
                <p className="text-[10px] text-emerald-600 font-semibold mt-0.5">Receipt sent to your email.</p>
                <button 
                  onClick={() => setActivePaymentId(null)}
                  className="mt-4 px-6 py-2 bg-[#FFB200] hover:bg-[#E68A00] text-black font-extrabold text-xs uppercase tracking-wider rounded-xl cursor-pointer"
                >
                  Done
                </button>
              </div>
            ) : (
              <button
                onClick={() => handleProcessPayment(selectedPayInvoice.id)}
                className="w-full bg-[#FFB200] hover:bg-[#E68A00] text-black py-4 mt-6 text-xs font-extrabold uppercase tracking-widest rounded-2xl cursor-pointer shadow-md flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
              >
                <CreditCard size={16} />
                <span>Pay {selectedPayInvoice.amount} via Stripe</span>
              </button>
            )}
            
            <p className="text-[10px] text-center text-slate-400 font-semibold mt-4">🔒 Secured by Stripe · AES-256 encryption</p>
          </div>
        </div>
      ) : (
        // Invoices Listing Screen
        <>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl border border-slate-150 shadow-xs p-4">
              <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Outstanding</p>
              <p className="text-xl font-black mt-1.5 text-red-600">$3,017.70</p>
            </div>
            <div className="bg-white rounded-2xl border border-slate-150 shadow-xs p-4">
              <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Paid (All Time)</p>
              <p className="text-xl font-black mt-1.5 text-emerald-600">$3,740.00</p>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-150 shadow-sm overflow-hidden mt-2">
            <div className="divide-y divide-slate-100">
              {invoices.map((inv) => {
                const isPaid = inv.status === 'paid';
                return (
                  <div key={inv.id} className="p-5 flex justify-between items-center flex-wrap gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-extrabold text-slate-900 text-sm font-mono">{inv.id}</p>
                        <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                          isPaid 
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
                            : 'bg-red-50 text-red-700 border-red-100'
                        }`}>
                          {isPaid ? 'Paid' : 'Unpaid'}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-450 font-bold mt-1 uppercase tracking-wider">
                        {inv.job} · Issued {inv.issued} · Due {inv.due}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 ml-auto">
                      <span className="font-extrabold text-slate-900 text-sm font-mono mr-2">{inv.amount}</span>
                      <button 
                        onClick={() => window.open('/assets/invoice-sample.pdf', '_blank')}
                        className="btn bg-slate-900 hover:bg-black text-[#FFB200] font-extrabold text-[10px] uppercase tracking-widest px-3.5 py-2 rounded-xl cursor-pointer transition-all flex items-center gap-1.5"
                      >
                        <Download size={12} />
                        <span>PDF</span>
                      </button>
                      {!isPaid && (
                        <button
                          onClick={() => handlePayInvoice(inv.id)}
                          className="btn bg-[#FFB200] hover:bg-[#E68A00] text-black font-extrabold text-[10px] uppercase tracking-widest px-3.5 py-2 rounded-xl cursor-pointer transition-all active:scale-[0.98]"
                        >
                          Pay Now
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
