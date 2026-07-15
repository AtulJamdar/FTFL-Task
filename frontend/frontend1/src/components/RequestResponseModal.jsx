import React, { useState } from 'react';
import { useTheme } from '../hooks/useTheme';
import { FiX } from 'react-icons/fi';

const RequestResponseModal = ({ request, action, onSubmit, onClose }) => {
    const { isDarkMode } = useTheme();
    const [responseMessage, setResponseMessage] = useState('');
    const [loading, setLoading] = useState(false);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
        await onSubmit(responseMessage);
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
            <h2 className="text-2xl font-bold">
              {action === 'approve' ? '✅ Approve Request' : '❌ Reject Request'}
            </h2>
            <button onClick={onClose} className="text-2xl hover:text-red-500">
              <FiX />
            </button>
          </div>
  
          <div className={`mb-4 p-3 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
            <p className="font-semibold">{request?.bookId?.title}</p>
            <p className="text-sm">by {request?.bookId?.author}</p>
            <p className="text-sm mt-1">Requested by: {request?.userId?.name}</p>
          </div>
  
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block mb-2 font-semibold">
                {action === 'approve' ? 'Approval Message' : 'Rejection Reason'}
              </label>
              <textarea
                value={responseMessage}
                onChange={(e) => setResponseMessage(e.target.value)}
                placeholder={
                  action === 'approve'
                    ? 'Add an optional approval message...'
                    : 'Please provide a reason for rejection...'
                }
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
                className={`flex-1 px-4 py-2 text-white rounded font-semibold ${
                  action === 'approve'
                    ? 'bg-green-500 hover:bg-green-600'
                    : 'bg-red-500 hover:bg-red-600'
                }`}
              >
                {loading ? 'Processing...' : action === 'approve' ? 'Approve' : 'Reject'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  
  export default RequestResponseModal;