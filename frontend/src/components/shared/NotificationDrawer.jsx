import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Trash2, Bell } from 'lucide-react';
import useAppStore from '../../store/useAppStore';

export default function NotificationDrawer() {
  const isOpen = useAppStore(state => state.isNotificationsOpen);
  const setOpen = useAppStore(state => state.setNotificationsOpen);
  const notifications = useAppStore(state => state.notifications);
  const markRead = useAppStore(state => state.markNotificationRead);
  const clearAll = useAppStore(state => state.clearAllNotifications);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />
          <motion.div 
            initial={{ x: '100%' }} 
            animate={{ x: 0 }} 
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-sm bg-card border-l border-white/10 z-50 flex flex-col shadow-2xl"
          >
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Bell size={20} className="text-white" />
                <h2 className="text-lg font-bold text-white">Notifications</h2>
                {notifications.filter(n => !n.isRead).length > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-accent-teal text-[10px] font-bold text-white">
                    {notifications.filter(n => !n.isRead).length} New
                  </span>
                )}
              </div>
              <div className="flex items-center gap-4">
                <button onClick={clearAll} className="text-xs text-text-muted hover:text-white transition-colors flex items-center gap-1">
                  <Trash2 size={14} /> Clear
                </button>
                <button onClick={() => setOpen(false)} className="text-text-muted hover:text-white transition-colors">
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 hide-scrollbar">
              {notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center p-6">
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 text-text-muted">
                    <Bell size={32} />
                  </div>
                  <h3 className="text-white font-medium mb-1">All caught up!</h3>
                  <p className="text-sm text-text-muted">You have no new notifications right now.</p>
                </div>
              ) : (
                notifications.map((notif) => (
                  <motion.div 
                    layout
                    key={notif.id}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      notif.isRead 
                        ? 'bg-white/5 border-white/5 text-text-muted' 
                        : 'bg-gradient-to-r from-accent-teal/10 to-transparent border-accent-teal/20'
                    }`}
                    onClick={() => !notif.isRead && markRead(notif.id)}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <h4 className={`font-semibold text-sm ${notif.isRead ? 'text-text-secondary' : 'text-white'}`}>{notif.title}</h4>
                      {!notif.isRead && <div className="w-2 h-2 rounded-full bg-accent-teal mt-1" />}
                    </div>
                    <p className={`text-xs mb-2 ${notif.isRead ? 'text-text-muted' : 'text-text-secondary'}`}>{notif.message}</p>
                    <div className="flex justify-between items-center text-[10px] text-text-muted">
                      <span className="uppercase tracking-wider font-medium">{notif.type}</span>
                      <span>{notif.time}</span>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
