import React, { useState } from 'react';
import { useTheme } from '../hooks/useTheme';
import { FiX } from 'react-icons/fi';

const BookRequestModal = ({ book, onSubmit, onClose }) => {
    const { isDarkMode } = useTheme();
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
        await onSubmit(message);
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div
          className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'} rounded-lg p-6 w-96 max-h-96 overflow-y-auto`}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Request Book</h2>
            <button onClick={onClose} className="text-2xl hover:text-red-500">
              <FiX />
            </button>
          </div>
  
          <div className={`mb-4 p-3 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
            <p className="font-semibold">{book.title}</p>
            <p className="text-sm">by {book.author}</p>
            <p className="text-sm mt-1">Category: {book.category}</p>
          </div>
  
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-2 font-semibold">Message (Optional)</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell the admin why you need this book..."
                rows="4"
                className={`w-full px-3 py-2 border rounded ${
                  isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                }`}
              />
            </div>
  
            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className={`flex-1 px-4 py-2 rounded font-semibold ${
                  isDarkMode
                    ? 'bg-gray-700 hover:bg-gray-600'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded font-semibold"
              >
                {loading ? 'Submitting...' : 'Submit Request'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  
  export default BookRequestModal;