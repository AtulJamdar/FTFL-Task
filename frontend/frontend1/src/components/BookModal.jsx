import React, { useState, useEffect } from 'react';
import { useTheme } from '../hooks/useTheme';
import axios from 'axios';
import { FiX } from 'react-icons/fi';

const BookModal = ({ book, onClose, onSuccess }) => {
  const { isDarkMode } = useTheme();
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category: '',
    isbn: '',
    totalCopies: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title,
        author: book.author,
        category: book.category,
        isbn: book.isbn || '',
        totalCopies: book.totalCopies,
      });
    }
  }, [book]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (book) {
        await axios.put(`http://localhost:5000/api/books/${book._id}`, formData);
      } else {
        await axios.post('http://localhost:5000/api/books', formData);
      }
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || 'Error saving book');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div
        className={`w-full max-w-lg rounded-2xl shadow-2xl transition-all duration-300 ${
          isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-800'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">
            {book ? 'Edit Book' : 'Add New Book'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-red-500/10 hover:text-red-500 transition"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 max-h-[70vh] overflow-y-auto">
          {error && (
            <div className="mb-4 p-3 text-sm rounded-lg border ${
              isDarkMode
                ? 'bg-red-900/40 border-red-700 text-red-300'
                : 'bg-red-50 border-red-200 text-red-600'
            }">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1">Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className={`w-full px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                  isDarkMode
                    ? 'bg-gray-800 border-gray-700 placeholder-gray-400'
                    : 'bg-gray-50 border-gray-300'
                }`}
                placeholder="Enter book title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Author *</label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                required
                className={`w-full px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                  isDarkMode
                    ? 'bg-gray-800 border-gray-700 placeholder-gray-400'
                    : 'bg-gray-50 border-gray-300'
                }`}
                placeholder="Enter author name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Category *</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className={`w-full px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                  isDarkMode
                    ? 'bg-gray-800 border-gray-700 placeholder-gray-400'
                    : 'bg-gray-50 border-gray-300'
                }`}
                placeholder="Enter category"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">ISBN</label>
              <input
                type="text"
                name="isbn"
                value={formData.isbn}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                  isDarkMode
                    ? 'bg-gray-800 border-gray-700 placeholder-gray-400'
                    : 'bg-gray-50 border-gray-300'
                }`}
                placeholder="Optional"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Total Copies *</label>
              <input
                type="number"
                name="totalCopies"
                value={formData.totalCopies}
                onChange={handleChange}
                required
                min="1"
                className={`w-full px-4 py-2.5 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                  isDarkMode
                    ? 'bg-gray-800 border-gray-700 placeholder-gray-400'
                    : 'bg-gray-50 border-gray-300'
                }`}
                placeholder="Enter number of copies"
              />
            </div>

            {/* Footer */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className={`w-full sm:w-1/2 px-4 py-2.5 rounded-lg font-medium transition ${
                  isDarkMode
                    ? 'bg-gray-800 hover:bg-gray-700 border border-gray-700'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-1/2 px-4 py-2.5 rounded-lg font-medium bg-blue-600 hover:bg-blue-700 text-white transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? 'Saving...' : 'Save Book'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookModal;