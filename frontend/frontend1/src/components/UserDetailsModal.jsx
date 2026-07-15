import React, { useState, useEffect } from 'react';
import { useTheme } from '../hooks/useTheme';
import axios from 'axios';
import { FiX } from 'react-icons/fi';

const UserDetailsModal = ({ user, onClose }) => {
  const { isDarkMode } = useTheme();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserDetails();
  }, [user._id]);

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/users/${user._id}/details`
      );
      setDetails(response.data);
    } catch (error) {
      console.error('Error fetching user details:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div
        className={`w-full max-w-3xl rounded-2xl shadow-2xl transition-all duration-300 ${
          isDarkMode
            ? 'bg-gray-900 text-gray-100 border border-gray-800'
            : 'bg-white text-gray-800 border border-gray-200'
        }`}
      >
        {/* Header */}
        <div
          className={`flex items-center justify-between px-6 py-4 border-b ${
            isDarkMode ? 'border-gray-800' : 'border-gray-200'
          }`}
        >
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">
            {user.name}'s Details
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-red-500/10 hover:text-red-500 transition"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 max-h-[75vh] overflow-y-auto">
          {loading ? (
            <div className="flex justify-center items-center py-10">
              <div className="animate-pulse text-sm opacity-70">
                Loading user data...
              </div>
            </div>
          ) : (
            <>
              {/* User Info Card */}
              <div
                className={`mb-8 p-5 rounded-xl ${
                  isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
                }`}
              >
                <div className="grid sm:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-xs uppercase opacity-60 mb-1">
                      Email
                    </p>
                    <p className="font-medium break-words">
                      {user.email}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs uppercase opacity-60 mb-1">
                      Role
                    </p>
                    <p className="font-medium">
                      {user.role === 'admin' ? 'Admin' : 'Student'}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs uppercase opacity-60 mb-1">
                      Joined
                    </p>
                    <p className="font-medium">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>

              {details && (
                <>
                  {/* Stats Section */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    <div
                      className={`p-5 rounded-xl text-center shadow-sm ${
                        isDarkMode
                          ? 'bg-blue-900/40 border border-blue-800'
                          : 'bg-blue-50 border border-blue-200'
                      }`}
                    >
                      <p className="text-3xl font-bold">
                        {details.stats.totalIssuedBooks}
                      </p>
                      <p className="text-sm opacity-70 mt-1">
                        Active Books
                      </p>
                    </div>

                    <div
                      className={`p-5 rounded-xl text-center shadow-sm ${
                        isDarkMode
                          ? 'bg-green-900/40 border border-green-800'
                          : 'bg-green-50 border border-green-200'
                      }`}
                    >
                      <p className="text-3xl font-bold">
                        {details.stats.totalReturnedBooks}
                      </p>
                      <p className="text-sm opacity-70 mt-1">
                        Returned
                      </p>
                    </div>

                    <div
                      className={`p-5 rounded-xl text-center shadow-sm ${
                        isDarkMode
                          ? 'bg-red-900/40 border border-red-800'
                          : 'bg-red-50 border border-red-200'
                      }`}
                    >
                      <p className="text-3xl font-bold">
                        {details.stats.overdueBooks}
                      </p>
                      <p className="text-sm opacity-70 mt-1">
                        Overdue
                      </p>
                    </div>
                  </div>

                  {/* Issued Books */}
                  {details.issuedBooks && details.issuedBooks.length > 0 && (
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold mb-3">
                        Currently Issued Books
                      </h3>
                      <div
                        className={`space-y-3 p-4 rounded-xl ${
                          isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
                        }`}
                      >
                        {details.issuedBooks.map((issue) => (
                          <div
                            key={issue._id}
                            className={`p-3 rounded-lg border text-sm ${
                              isDarkMode
                                ? 'border-gray-700 bg-gray-900'
                                : 'border-gray-200 bg-white'
                            }`}
                          >
                            <p className="font-medium">
                              {issue.bookId.title}
                            </p>
                            <p className="opacity-70">
                              by {issue.bookId.author}
                            </p>
                            <p className="mt-1 text-xs opacity-60">
                              Due: {new Date(issue.dueDate).toLocaleDateString()}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Overdue Books */}
                  {details.overdueBooks && details.overdueBooks.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-3 text-red-500">
                        Overdue Books
                      </h3>
                      <div
                        className={`space-y-3 p-4 rounded-xl ${
                          isDarkMode
                            ? 'bg-red-900/20 border border-red-800'
                            : 'bg-red-50 border border-red-200'
                        }`}
                      >
                        {details.overdueBooks.map((issue) => (
                          <div
                            key={issue._id}
                            className="text-sm"
                          >
                            <p className="font-medium">
                              {issue.bookId.title}
                            </p>
                            <p className="text-xs opacity-70">
                              Due: {new Date(issue.dueDate).toLocaleDateString()}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* Footer Button */}
              <button
                onClick={onClose}
                className="w-full mt-4 px-4 py-2.5 rounded-xl font-medium bg-blue-600 hover:bg-blue-700 text-white transition"
              >
                Close
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDetailsModal;