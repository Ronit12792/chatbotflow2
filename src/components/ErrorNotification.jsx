import React, { useEffect } from 'react';
import { X, AlertCircle } from 'lucide-react';

const ErrorNotification = ({ message, onClose }) => {
  // Auto-close after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-0 left-1/2 transform -translate-x-1/2 z-50 mt-4">
      <div className="bg-red-100 border border-red-300 text-red-800 px-6 py-3 rounded-lg shadow-lg flex items-center space-x-3 min-w-[300px] max-w-md">
        <AlertCircle size={20} className="text-red-600 flex-shrink-0" />
        <span className="font-medium flex-1">{message}</span>
        <button
          onClick={onClose}
          className="text-red-600 hover:text-red-800 transition-colors duration-200 p-1 rounded hover:bg-red-200"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default ErrorNotification;
