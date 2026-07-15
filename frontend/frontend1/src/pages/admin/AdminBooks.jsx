import React, { useState, useEffect } from "react";
import { useTheme } from "../../hooks/useTheme";
import axios from "axios";
import { FiEdit2, FiTrash2, FiPlus, FiSearch } from "react-icons/fi";
import BookModal from "../../components/BookModal";
import AdminSidebar from "../../components/AdminSidebar";
import DashboardMain from "../../components/layout/DashboardMain";

// Modern UI Components
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Field, FieldGroup } from "../../components/ui/field";

const AdminBooks = () => {
  const { isDarkMode } = useTheme();

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/books");
      setBooks(response.data.books);
    } catch (err) {
      setError("Error fetching books");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this book permanently?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/books/${id}`);
      setSuccess("Book deleted successfully");
      fetchBooks();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Error deleting book");
    }
  };

  const handleEdit = (book) => {
    setEditingBook(book);
    setShowModal(true);
  };

  const handleAddNew = () => {
    setEditingBook(null);
    setShowModal(true);
  };

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        isDarkMode ? "bg-gray-950 text-indigo-400" : "bg-gray-50 text-indigo-600"
      }`}>
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
          <p className="font-medium animate-pulse">Loading library data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex min-h-screen ${
      isDarkMode ? "bg-gray-950 text-gray-100" : "bg-gray-50 text-gray-900"
    }`}>
      {/* Sidebar */}
      <AdminSidebar />

      <DashboardMain
        isDarkMode={isDarkMode}
        heroTitle="Books management"
        heroSubtitle="Manage your catalog, availability, and new titles from one centered workspace."
      >
        <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-end gap-4 mb-8">
          <Button
            onClick={handleAddNew}
            className="bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/25 px-6 py-3 rounded-xl font-semibold transition-all"
          >
            <FiPlus className="mr-2 h-5 w-5" />
            Add new book
          </Button>
        </div>

        {/* Alerts Section */}
        <div className="space-y-4 mb-6">
          {error && (
            <div className="px-4 py-3 rounded-xl bg-red-500/10 text-red-500 border border-red-500/20 flex items-center justify-between animate-in slide-in-from-top-2">
              <span className="text-sm font-medium">{error}</span>
              <button onClick={() => setError("")} className="hover:bg-red-500/20 p-1 rounded-md transition">✕</button>
            </div>
          )}

          {success && (
            <div className="px-4 py-3 rounded-xl bg-green-500/10 text-green-500 border border-green-500/20 flex items-center justify-between animate-in slide-in-from-top-2">
              <span className="text-sm font-medium">{success}</span>
              <button onClick={() => setSuccess("")} className="hover:bg-green-500/20 p-1 rounded-md transition">✕</button>
            </div>
          )}
        </div>

        {/* Filters and Actions Bar */}
        <div className="mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full max-w-md">
            <FiSearch
              size={20}
              className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDarkMode ? "text-gray-500" : "text-gray-400"}`}
            />
            <Input
              type="text"
              placeholder="Search by title or author..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`pl-11 rounded-xl transition-all ${
                isDarkMode 
                  ? "bg-gray-900/50 border-gray-800 focus:ring-indigo-500 focus:border-indigo-500" 
                  : "bg-white border-gray-200"
              }`}
            />
          </div>
        </div>

        {/* Books Table Wrapper */}
        <div className={`rounded-2xl overflow-hidden border shadow-sm ${
          isDarkMode ? "border-gray-800 bg-gray-900/50 backdrop-blur-sm" : "border-gray-200 bg-white"
        }`}>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className={`text-xs uppercase tracking-wider font-semibold ${
                isDarkMode ? "bg-gray-800/50 text-gray-400" : "bg-gray-50 text-gray-500"
              }`}>
                <tr>
                  <th className="px-6 py-4">Book Details</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4 text-center">Inventory</th>
                  <th className="px-6 py-4 text-center">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-800/10">
                {filteredBooks.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-16 opacity-60">
                      <div className="flex flex-col items-center gap-2">
                        <FiSearch size={32} />
                        <p className="text-sm">No books matching your search.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredBooks.map((book) => (
                    <tr key={book._id} className={`transition-colors ${
                      isDarkMode ? "hover:bg-gray-800/40" : "hover:bg-gray-50"
                    }`}>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-bold text-sm md:text-base">{book.title}</span>
                          <span className="text-xs opacity-60">by {book.author}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-xs px-2 py-1 rounded-md ${
                          isDarkMode ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-700"
                        }`}>
                          {book.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center text-sm font-medium">
                        {book.totalCopies} <span className="text-xs opacity-50 font-normal ml-1">Total</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          book.availableCopies > 0
                            ? "bg-emerald-500/10 text-emerald-500"
                            : "bg-rose-500/10 text-rose-500"
                        }`}>
                          {book.availableCopies} available
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-2">
                          <Button
                            onClick={() => handleEdit(book)}
                            variant="outline"
                            className={`p-2 h-9 w-9 border-indigo-500/20 text-indigo-500 hover:bg-indigo-500 hover:text-white rounded-lg transition-all duration-200 ease-out hover:scale-110 hover:-translate-y-0.5`}
                          >
                            <FiEdit2 size={14} />
                          </Button>
                          <Button
                            onClick={() => handleDelete(book._id)}
                            variant="destructive"
                            className="p-2 h-9 w-9 bg-rose-600/10 text-rose-500 hover:bg-rose-600 hover:text-white border-none rounded-lg transition-all duration-200 ease-out hover:scale-110 hover:-translate-y-0.5"
                          >
                            <FiTrash2 size={14} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </DashboardMain>

      {/* Modal */}
      {showModal && (
        <BookModal
          book={editingBook}
          onClose={() => {
            setShowModal(false);
            setEditingBook(null);
          }}
          onSuccess={() => {
            setShowModal(false);
            setEditingBook(null);
            fetchBooks();
            setSuccess(editingBook ? "Book updated successfully" : "Book added successfully");
            setTimeout(() => setSuccess(""), 3000);
          }}
        />
      )}
    </div>
  );
};

export default AdminBooks;