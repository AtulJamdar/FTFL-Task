import React, { useState, useEffect } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../hooks/useAuth';
import axios from 'axios';
import { FiSearch, FiSend } from 'react-icons/fi';
import BookRequestModal from '../../components/BookRequests';
import StudentSidebar from '../../components/StudentSidebar';
import DashboardMain from '../../components/layout/DashboardMain';

const BookRequests = () => {
  const { isDarkMode } = useTheme();
  const { user } = useAuth();

  const [allBooks, setAllBooks] = useState([]);
  const [requests, setRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [booksRes, requestsRes] = await Promise.all([
        axios.get('http://localhost:5000/api/books'),
        axios.get(`http://localhost:5000/api/requests/user/${user.id}`)
      ]);

      setAllBooks(booksRes.data.books);
      setRequests(requestsRes.data.requests);

    } catch (error) {
      setError('Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  const handleRequestBook = async (bookId, message) => {
    try {

      await axios.post('http://localhost:5000/api/requests', {
        bookId,
        requestMessage: message
      });

      setSuccess('Request submitted successfully!');
      setShowModal(false);
      setSelectedBook(null);
      fetchData();

      setTimeout(() => setSuccess(''), 3000);

    } catch (error) {
      setError(error.response?.data?.message || 'Error submitting request');
    }
  };

  const filteredBooks = allBooks.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const requestedBookIds = requests
    .filter((r) => r.status === 'pending')
    .map((r) => r.bookId?._id);

  if (loading) {
    return (
      <div className={`flex min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50'}`}>
        <StudentSidebar />
        <div className={`flex flex-1 items-center justify-center ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>
          <div className="flex flex-col items-center gap-4">
            <div className="h-10 w-10 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
            <p className="font-medium animate-pulse">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return (

    <div className={`flex min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>

      {/* Sidebar */}
      <StudentSidebar />

      <DashboardMain
        isDarkMode={isDarkMode}
        heroTitle="Book requests"
        heroSubtitle="Track your holds and request new titles from the catalog."
      >
        <div className="space-y-8">
          {error && (
            <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
              {error}
              <button onClick={() => setError('')} className="float-right">✕</button>
            </div>
          )}

          {success && (
            <div className="mb-4 p-4 bg-green-100 text-green-700 rounded">
              {success}
              <button onClick={() => setSuccess('')} className="float-right">✕</button>
            </div>
          )}

          {/* My Requests */}

          <div className="mb-10">

            <h2 className="text-xl font-bold mb-4 tracking-tight">My requests</h2>

            {requests.length === 0 ? (

              <div className={`p-6 rounded-xl border text-center shadow-sm ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                <p>No requests yet.</p>
              </div>

            ) : (

              <div className="grid grid-cols-1 gap-4">

                {requests.map((req) => (

                  <div
                    key={req._id}
                    className={`p-6 rounded-xl border shadow-sm ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
                  >

                    <div className="flex justify-between">

                      <div>

                        <h3 className="font-bold text-lg">{req.bookId?.title}</h3>

                        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {req.bookId?.author}
                        </p>

                        {req.requestMessage && (
                          <p className="text-sm mt-2">
                            Message: {req.requestMessage}
                          </p>
                        )}

                      </div>

                      <span
                        className={`px-3 py-1 rounded text-sm font-semibold ${
                          req.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : req.status === 'approved'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {req.status === 'pending'
                          ? '⏳ Pending'
                          : req.status === 'approved'
                          ? '✅ Approved'
                          : '❌ Rejected'}
                      </span>

                    </div>

                    {req.responseMessage && (

                      <div className={`mt-3 p-3 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>

                        <p className="text-sm font-semibold">Admin Response:</p>
                        <p className="text-sm">{req.responseMessage}</p>

                      </div>

                    )}

                    <p className="text-xs mt-3 text-gray-500">
                      Requested on {new Date(req.createdAt).toLocaleDateString()}
                    </p>

                  </div>

                ))}

              </div>

            )}

          </div>

          {/* Search */}

          <div className="mb-6 relative">

            <FiSearch className={`absolute left-3 top-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />

            <input
              type="text"
              placeholder="Search books..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                isDarkMode
                  ? 'bg-gray-800 border-gray-700 text-white'
                  : 'bg-white border-gray-300'
              }`}
            />

          </div>

          {/* Books */}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {filteredBooks.map((book) => {

              const isRequested = requestedBookIds.includes(book._id);

              return (

                <div
                  key={book._id}
                  className={`p-6 rounded-xl border shadow-sm ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}
                >

                  <h3 className="text-lg font-bold mb-2">{book.title}</h3>

                  <p className="text-sm text-gray-500 mb-4">{book.author}</p>

                  <p className="text-sm mb-2">Category: {book.category}</p>

                  {book.isbn && (
                    <p className="text-sm mb-4">ISBN: {book.isbn}</p>
                  )}

                  <button
                    onClick={() => {
                      setSelectedBook(book);
                      setShowModal(true);
                    }}
                    disabled={isRequested}
                    className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold transition-colors ${
                      isRequested
                        ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                        : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm'
                    }`}
                  >
                    <FiSend size={18} />
                    {isRequested ? 'Already Requested' : 'Request Book'}
                  </button>

                </div>

              );

            })}

          </div>

        </div>
      </DashboardMain>

      {/* Modal */}

      {showModal && selectedBook && (

        <BookRequestModal
          book={selectedBook}
          onSubmit={(message) => handleRequestBook(selectedBook._id, message)}
          onClose={() => {
            setShowModal(false);
            setSelectedBook(null);
          }}
        />

      )}

    </div>
  );
};

export default BookRequests;