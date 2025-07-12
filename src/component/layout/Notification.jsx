import React, { createContext, useContext, useState, useCallback } from 'react';
import { X, CheckCircle, AlertTriangle, Info } from 'lucide-react';

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(null);
  const [timeoutId, setTimeoutId] = useState(null);

  const showNotification = useCallback((message, type = 'info', duration = 3500) => {
    setNotification({ message, type });
    if (timeoutId) clearTimeout(timeoutId);
    const id = setTimeout(() => setNotification(null), duration);
    setTimeoutId(id);
  }, [timeoutId]);

  const closeNotification = () => {
    setNotification(null);
    if (timeoutId) clearTimeout(timeoutId);
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      {notification && (
        <div className={`fixed z-[9999] left-1/2 -translate-x-1/2 bottom-8 sm:bottom-12 px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 min-w-[250px] max-w-[90vw] text-white font-semibold text-base animate-fade-in-up
          ${notification.type === 'success' ? 'bg-gradient-to-r from-green-500 to-green-600' : ''}
          ${notification.type === 'error' ? 'bg-gradient-to-r from-red-500 to-red-600' : ''}
          ${notification.type === 'info' ? 'bg-gradient-to-r from-[#9B7BB8] to-[#8A6AA7]' : ''}
        `}>
          {notification.type === 'success' && <CheckCircle className="w-6 h-6 text-white" />}
          {notification.type === 'error' && <AlertTriangle className="w-6 h-6 text-white" />}
          {notification.type === 'info' && <Info className="w-6 h-6 text-white" />}
          <span className="flex-1">{notification.message}</span>
          <button onClick={closeNotification} className="ml-2 p-1 rounded-full hover:bg-white/10 transition">
            <X className="w-5 h-5 text-white" />
          </button>
        </div>
      )}
    </NotificationContext.Provider>
  );
};

// Usage:
// 1. Wrap your app in <NotificationProvider> in App.js
// 2. Use the useNotification() hook in any component to show notifications
//    Example: const { showNotification } = useNotification();
//    showNotification('Book added to cart!', 'success'); 