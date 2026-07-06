import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { markAsRead, bulkAction } from '../../store/slices/notificationsSlice';

export default function NotificationDropdown({ onClose, onViewAll }) {
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);
  
  // Get active (unarchived) notifications
  const notifications = useSelector((state) => 
    state.notifications.notifications.filter(n => !n.archived)
  );

  // Click outside listener
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const handleClearAll = (e) => {
    e.stopPropagation();
    const ids = notifications.map(n => n.id);
    if (ids.length > 0) {
      dispatch(bulkAction({ ids, actionType: 'archive' }));
    }
  };

  const handleItemClick = (id) => {
    dispatch(markAsRead(id));
  };

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 top-full mt-3 w-[360px] bg-white rounded-[24px] shadow-2xl border border-slate-100/90 z-50 overflow-hidden text-slate-900 animate-fade-in text-left"
      style={{
        boxShadow: '0 20px 40px -15px rgba(0,0,0,0.08), 0 0 1px 0 rgba(0,0,0,0.1)'
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-8 py-[22px] border-b border-slate-100">
        <h3 className="text-[15px] font-bold text-slate-900">Notifications</h3>
        {notifications.length > 0 && (
          <button
            onClick={handleClearAll}
            className="text-[11px] font-extrabold text-[#FFB200] hover:text-[#E68A00] transition-colors tracking-wider uppercase cursor-pointer"
          >
            CLEAR ALL
          </button>
        )}
      </div>

      {/* Body / List */}
      <div className="max-h-[360px] overflow-y-auto divide-y divide-slate-100">
        {notifications.length === 0 ? (
          <div className="py-12 px-6 text-center text-slate-400 font-medium">
            <span className="text-2xl block mb-2">🔔</span>
            <p className="text-xs">No new notifications</p>
          </div>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              onClick={() => handleItemClick(n.id)}
              className={`px-8 py-6 transition-colors cursor-pointer flex flex-col ${
                !n.read 
                  ? 'bg-[#FFFDF4]/80 hover:bg-[#FFFDF4]' 
                  : 'bg-white hover:bg-slate-50/50'
              }`}
            >
              <div className="flex justify-between items-start gap-3">
                <h4 className="text-[13px] font-bold text-slate-900">{n.title}</h4>
              </div>
              <p className="text-xs text-slate-500 mt-1.5 leading-snug font-normal">{n.message}</p>
              <span className="text-[10px] text-slate-400 mt-2.5 block font-medium">{n.date}</span>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onViewAll();
        }}
        className="w-full py-[18px] text-center text-xs font-bold text-slate-650 hover:text-slate-950 border-t border-slate-100 bg-white hover:bg-slate-50 transition-colors cursor-pointer block font-sans"
      >
        View All Activity
      </button>
    </div>
  );
}
