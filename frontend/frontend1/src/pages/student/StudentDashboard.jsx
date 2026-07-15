import React, { useState, useEffect } from "react";
import { useTheme } from "../../hooks/useTheme";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import StudentSidebar from "../../components/StudentSidebar";
import DashboardMain from "../../components/layout/DashboardMain";
import { FiCalendar, FiMessageSquare } from "react-icons/fi";

const StudentDashboard = () => {
  const { isDarkMode } = useTheme();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [activeBooks, setActiveBooks] = useState([]);
  const [allBooks, setAllBooks] = useState([]);
  const [userFines, setUserFines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [activeRes, booksRes, finesRes] = await Promise.all([
        axios.get(`http://localhost:5000/api/issues/user/${user.id}/active`),
        axios.get("http://localhost:5000/api/books"),
        axios.get(`http://localhost:5000/api/fines/user/${user.id}`),
      ]);

      setActiveBooks(activeRes.data.issues);
      setAllBooks(booksRes.data.books);
      setUserFines(finesRes.data.fines);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredBooks = allBooks.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isOverdue = (dueDate) => new Date() > new Date(dueDate);

  const getDaysLeft = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const pendingFines = userFines.filter((f) => f.status === "pending");
  const totalPendingFine = pendingFines.reduce(
    (sum, f) => sum + f.totalFine,
    0
  );

  if (loading) {
    return (
      <div
        className={`flex min-h-screen ${
          isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50"
        }`}
      >
        <StudentSidebar />
        <div className="flex flex-1 items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="h-10 w-10 border-4 border-indigo-500/20 border-t-indigo-600 rounded-full animate-spin" />
            <p className="text-sm text-gray-500 dark:text-gray-400">Loading…</p>
          </div>
        </div>
      </div>
    );
  }

  const statCard = (label, value, sub) => (
    <div
      className={`rounded-2xl border p-6 text-center shadow-sm transition-shadow hover:shadow-md ${
        isDarkMode
          ? "bg-gray-900/80 border-gray-800"
          : "bg-white border-gray-200"
      }`}
    >
      <p className="text-3xl font-bold tabular-nums text-indigo-600 dark:text-indigo-400">
        {value}
      </p>
      <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">
        {label}
      </p>
      {sub && (
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{sub}</p>
      )}
    </div>
  );

  return (
    <div
      className={`flex min-h-screen ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <StudentSidebar />

      <DashboardMain
        isDarkMode={isDarkMode}
        heroTitle={`Welcome back, ${user.name}`}
        heroSubtitle="Your loans, fines, and catalog—organized like a streaming home row, tuned for reading."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {statCard("Active books", activeBooks.length)}
          {statCard("Pending fines", pendingFines.length)}
          {statCard("Fine total", `₹${totalPendingFine}`, "pending")}
          {statCard("In catalog", allBooks.length, "titles")}
        </div>

        <div className="mb-12 text-center max-w-3xl mx-auto">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            My issued books
          </h2>
          {activeBooks.length === 0 ? (
            <div
              className={`p-10 rounded-2xl border ${
                isDarkMode
                  ? "bg-gray-900/60 border-gray-800 text-gray-400"
                  : "bg-white border-gray-200 text-gray-600"
              }`}
            >
              You don&apos;t have any books checked out right now.
            </div>
          ) : (
            <div className="space-y-4 text-left max-w-3xl mx-auto">
              {activeBooks.map((issue) => {
                const daysLeft = getDaysLeft(issue.dueDate);
                const overdue = isOverdue(issue.dueDate);
                return (
                  <div
                    key={issue._id}
                    className={`p-6 rounded-2xl border shadow-sm ${
                      isDarkMode
                        ? "bg-gray-900/80 border-gray-800"
                        : "bg-white border-gray-200"
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                          {issue.bookId.title}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {issue.bookId.author}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          {issue.bookId.category}
                        </p>
                      </div>
                      <div className="text-left sm:text-right">
                        <div
                          className={`flex items-center gap-2 text-sm font-semibold ${
                            overdue ? "text-red-500" : "text-indigo-600"
                          }`}
                        >
                          <FiCalendar size={16} />
                          {overdue
                            ? `Overdue by ${Math.abs(daysLeft)} days`
                            : `${daysLeft} days left`}
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          Due: {new Date(issue.dueDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Browse the catalog
            </h2>
            <button
              type="button"
              onClick={() => navigate("/student/requests")}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold text-sm shadow-md shadow-indigo-600/25 transition-colors"
            >
              <FiMessageSquare size={18} />
              My requests
            </button>
          </div>

          <input
            type="text"
            placeholder="Search books…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full max-w-xl mx-auto block px-4 py-3 rounded-xl border mb-10 text-center sm:text-left ${
              isDarkMode
                ? "bg-gray-900 border-gray-700 text-white placeholder:text-gray-500 focus:ring-2 focus:ring-indigo-500"
                : "bg-white border-gray-200 focus:ring-2 focus:ring-indigo-500"
            }`}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {filteredBooks.map((book) => (
              <div
                key={book._id}
                className={`p-6 rounded-2xl border text-left shadow-sm hover:border-indigo-200 dark:hover:border-indigo-800 transition-colors ${
                  isDarkMode
                    ? "bg-gray-900/80 border-gray-800"
                    : "bg-white border-gray-200"
                }`}
              >
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                  {book.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {book.author}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  {book.category}
                </p>
                <p className="text-sm text-indigo-600 dark:text-indigo-400 mt-2 font-medium">
                  {book.totalCopies} copies
                </p>
              </div>
            ))}
          </div>
        </div>
      </DashboardMain>
    </div>
  );
};

export default StudentDashboard;
