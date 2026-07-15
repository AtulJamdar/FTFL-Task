import React, { useState, useEffect } from 'react';
import { useTheme } from '../hooks/useTheme';
import { FiX, FiCheckCircle, FiAlertCircle, FiInfo } from 'react-icons/fi';

export const useToast = () => {
    const [toasts, setToasts] = useState([]);
  
    const addToast = (message, type = 'info', duration = 3000) => {
      const id = Date.now();
      setToasts((prev) => [...prev, { id, message, type }]);
  
      if (duration > 0) {
        setTimeout(() => {
          removeToast(id);
        }, duration);
      }
  
      return id;
    };
  
    const removeToast = (id) => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    };
  
    return { toasts, addToast, removeToast };
  };
  
  const ToastContainer = ({ toasts, removeToast }) => {
    const { isDarkMode } = useTheme();
  
    return (
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            {...toast}
            onClose={() => removeToast(toast.id)}
            isDarkMode={isDarkMode}
          />
        ))}
      </div>
    );
  };
  
  const Toast = ({ id, message, type, onClose, isDarkMode }) => {
    const bgColor = {
      success: isDarkMode ? 'bg-green-600' : 'bg-green-500',
      error: isDarkMode ? 'bg-red-600' : 'bg-red-500',
      info: isDarkMode ? 'bg-blue-600' : 'bg-blue-500',
      warning: isDarkMode ? 'bg-yellow-600' : 'bg-yellow-500',
    }[type];
  
    const Icon = {
      success: FiCheckCircle,
      error: FiAlertCircle,
      info: FiInfo,
      warning: FiAlertCircle,
    }[type];
  
    return (
      <div
        className={`${bgColor} text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 min-w-64 animate-pulse`}
      >
        <Icon size={20} />
        <span className="flex-1">{message}</span>
        <button onClick={onClose} className="hover:opacity-80">
          <FiX size={20} />
        </button>
      </div>
    );
  };
  
  export default ToastContainer;