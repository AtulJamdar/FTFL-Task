import React, { useState, useEffect, useMemo } from "react";
import { useTheme } from "../../hooks/useTheme";
import axios from "axios";
import { FiPlus, FiBookOpen, FiUsers } from "react-icons/fi";
import AdminSidebar from "../../components/AdminSidebar";
import DashboardMain from "../../components/layout/DashboardMain";

// Modern UI Components
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Field, FieldGroup, FieldLabel } from "../../components/ui/field";

const API_BASE = "http://localhost:5000/api";

const IssueBook = () => {
  const { isDarkMode } = useTheme();

  const [students, setStudents] = useState([]);
  const [books, setBooks] = useState([]);

  const [formData, setFormData] = useState({
    userId: "",
    bookId: "",
    dueDate: "",
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [studentsRes, booksRes] = await Promise.all([
        axios.get(`${API_BASE}/users/role/students`),
        axios.get(`${API_BASE}/books`),
      ]);

      setStudents(studentsRes.data.students || []);
      setBooks(booksRes.data.books || []);
    } catch (err) {
      setError("Failed to load students or books.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const minDueDate = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() + 14);
    return date.toISOString().split("T")[0];
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.userId || !formData.bookId || !formData.dueDate) {
      setError("All fields are required.");
      return;
    }

    if (formData.dueDate < minDueDate) {
      setError("Due date must be at least 14 days from today.");
      return;
    }

    setSubmitting(true);
    setError("");
    setSuccess("");

    try {
      await axios.post(`${API_BASE}/issues/issue-book`, formData);

      setSuccess("Book issued successfully.");
      setFormData({ userId: "", bookId: "", dueDate: "" });

      setBooks((prev) =>
        prev.map((b) =>
          b._id === formData.bookId
            ? { ...b, availableCopies: b.availableCopies - 1 }
            : b
        )
      );
    } catch (err) {
      setError(err.response?.data?.message || "Failed to issue book.");
    } finally {
      setSubmitting(false);
    }
  };

  const availableBooks = useMemo(
    () => books.filter((b) => b.availableCopies > 0),
    [books]
  );

  if (loading) {
    return (
      <div className={`flex min-h-screen ${isDarkMode ? "bg-gray-950 text-indigo-400" : "bg-gray-50 text-indigo-600"}`}>
        <AdminSidebar />
        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          <div className="h-10 w-10 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
          <p className="font-medium animate-pulse">Syncing Library Records...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex min-h-screen ${isDarkMode ? "bg-gray-950 text-gray-100" : "bg-gray-50 text-gray-900"}`}>
      <AdminSidebar />

      <DashboardMain
        isDarkMode={isDarkMode}
        heroTitle="Issue a book"
        heroSubtitle="Assign library resources to students and set return deadlines."
      >
        <div className="w-full max-w-3xl mx-auto space-y-10 pb-4">

          {/* Alerts */}
          {(error || success) && (
            <div className={`flex items-center justify-between rounded-xl px-4 py-3 border text-sm animate-in fade-in slide-in-from-top-2 duration-300 ${
              error ? "bg-red-500/10 border-red-500/20 text-red-500" : "bg-emerald-500/10 border-emerald-500/20 text-emerald-500"
            }`}>
              <span className="font-medium">{error || success}</span>
              <button onClick={() => { setError(""); setSuccess(""); }} className="opacity-70 hover:opacity-100">✕</button>
            </div>
          )}

          {/* Form Card */}
          <div className={`rounded-2xl border shadow-xl p-8 lg:p-10 transition-all ${
            isDarkMode ? "bg-gray-900/50 border-gray-800 backdrop-blur-sm" : "bg-white border-gray-200"
          }`}>
            <form onSubmit={handleSubmit}>
              <FieldGroup className="space-y-6">

                <Field>
                  <FieldLabel className={isDarkMode ? "text-gray-300" : "text-gray-700"}>Select Student</FieldLabel>
                  <select
                    name="userId"
                    value={formData.userId}
                    onChange={handleChange}
                    required
                    className={`w-full rounded-xl border px-4 py-3 text-sm transition focus:ring-2 focus:ring-indigo-500 outline-none ${
                      isDarkMode ? "bg-gray-900 border-gray-700 text-gray-100" : "bg-gray-50 border-gray-300"
                    }`}
                  >
                    <option value="">Choose a student</option>
                    {students.map((student) => (
                      <option key={student._id} value={student._id}>
                        {student.name} ({student.email})
                      </option>
                    ))}
                  </select>
                </Field>

                <Field>
                  <FieldLabel className={isDarkMode ? "text-gray-300" : "text-gray-700"}>Select Book</FieldLabel>
                  <select
                    name="bookId"
                    value={formData.bookId}
                    onChange={handleChange}
                    required
                    className={`w-full rounded-xl border px-4 py-3 text-sm transition focus:ring-2 focus:ring-indigo-500 outline-none ${
                      isDarkMode ? "bg-gray-900 border-gray-700 text-gray-100" : "bg-gray-50 border-gray-300"
                    }`}
                  >
                    <option value="">Choose a book</option>
                    {books.map((book) => (
                      <option key={book._id} value={book._id} disabled={book.availableCopies === 0}>
                        {book.title} {book.availableCopies === 0 ? "(Out of stock)" : `(${book.availableCopies} available)`}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field>
                  <FieldLabel className={isDarkMode ? "text-gray-300" : "text-gray-700"}>Due Date</FieldLabel>
                  <Input
                    type="date"
                    name="dueDate"
                    value={formData.dueDate}
                    min={minDueDate}
                    onChange={handleChange}
                    required
                    className={isDarkMode ? "bg-gray-900/50 border-gray-700" : "bg-gray-50"}
                  />
                  <p className={`text-[11px] mt-1.5 px-1 ${isDarkMode ? "text-gray-500" : "text-gray-400"}`}>
                    Minimum allowed period is 14 days.
                  </p>
                </Field>

                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-6 rounded-xl shadow-lg shadow-indigo-500/20 transition-all active:scale-95"
                >
                  {submitting ? (
                    <span className="flex items-center gap-2">
                      <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Processing...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <FiPlus className="h-5 w-5" />
                      Issue Book
                    </span>
                  )}
                </Button>
              </FieldGroup>
            </form>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className={`rounded-2xl p-6 border transition-all hover:scale-[1.02] ${
              isDarkMode ? "bg-gray-900/40 border-gray-800" : "bg-white border-gray-200"
            }`}>
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-indigo-500/10 text-indigo-500">
                  <FiUsers size={24} />
                </div>
                <div>
                  <p className="text-2xl font-bold">{students.length}</p>
                  <p className={`text-xs uppercase tracking-wider font-semibold ${isDarkMode ? "text-gray-500" : "text-gray-400"}`}>
                    Registered Students
                  </p>
                </div>
              </div>
            </div>

            <div className={`rounded-2xl p-6 border transition-all hover:scale-[1.02] ${
              isDarkMode ? "bg-gray-900/40 border-gray-800" : "bg-white border-gray-200"
            }`}>
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-500">
                  <FiBookOpen size={24} />
                </div>
                <div>
                  <p className="text-2xl font-bold">{availableBooks.length}</p>
                  <p className={`text-xs uppercase tracking-wider font-semibold ${isDarkMode ? "text-gray-500" : "text-gray-400"}`}>
                    Books Available
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </DashboardMain>
    </div>
  );
};

export default IssueBook;