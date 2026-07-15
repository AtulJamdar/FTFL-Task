import React, { useState, useEffect } from "react";
import { useTheme } from "../../hooks/useTheme";
import axios from "axios";
import { FiCheck, FiSearch } from "react-icons/fi";
import AdminSidebar from "../../components/AdminSidebar";
import DashboardMain from "../../components/layout/DashboardMain";

const AdminFines = () => {
  const { isDarkMode } = useTheme();
  const [fines, setFines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("pending");
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchFines();
  }, [filter]);

  const fetchFines = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/fines");
      let filteredFines = response.data.fines;

      if (filter === "pending") {
        filteredFines = filteredFines.filter((f) => f.status === "pending");
      } else if (filter === "paid") {
        filteredFines = filteredFines.filter((f) => f.status === "paid");
      }

      setFines(filteredFines);
    } catch (error) {
      setError("Error fetching fines");
    } finally {
      setLoading(false);
    }
  };

  const handlePayFine = async (fineId) => {
    try {
      await axios.put(`http://localhost:5000/api/fines/${fineId}/pay`);
      setSuccess("Fine marked as paid!");
      fetchFines();
      setTimeout(() => setSuccess(""), 3000);
    } catch (error) {
      setError(error.response?.data?.message || "Error paying fine");
    }
  };

  const handleCalculateFines = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/fines/calculate"
      );
      setSuccess(response.data.message);
      fetchFines();
      setTimeout(() => setSuccess(""), 3000);
    } catch (error) {
      setError("Error calculating fines");
    }
  };

  const filteredFinesList = fines.filter(
    (fine) =>
      fine.userId?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fine.bookId?.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalAmount = filteredFinesList.reduce(
    (sum, f) => sum + f.totalFine,
    0
  );

  if (loading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          isDarkMode ? "bg-gray-950 text-indigo-400" : "bg-gray-50 text-indigo-600"
        }`}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
          <p className="font-medium animate-pulse">Loading fines...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      
      {/* Sidebar */}
      <AdminSidebar />

      <DashboardMain
        isDarkMode={isDarkMode}
        heroTitle="Fine management"
        heroSubtitle="Calculate overdue fees, track payments, and close the books on penalties."
      >
        <div className="space-y-8 leading-relaxed">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-4">
            <button
              type="button"
              onClick={handleCalculateFines}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold shadow-sm transition-colors w-full sm:w-auto text-center"
            >
              Calculate fines
            </button>
          </div>

          {/* Error */}
          {error && (
            <div className="p-4 bg-red-100 text-red-700 rounded-lg">
              {error}
              <button
                onClick={() => setError("")}
                className="float-right font-bold"
              >
                ✕
              </button>
            </div>
          )}

          {/* Success */}
          {success && (
            <div className="p-4 bg-green-100 text-green-700 rounded-lg">
              {success}
              <button
                onClick={() => setSuccess("")}
                className="float-right font-bold"
              >
                ✕
              </button>
            </div>
          )}

          {/* Filter */}
          <div className="flex gap-4">
            <button
              onClick={() => setFilter("pending")}
              className={`px-4 py-2 rounded font-semibold ${
                filter === "pending"
                  ? "bg-indigo-600 text-white"
                  : isDarkMode
                  ? "bg-gray-700"
                  : "bg-gray-200"
              }`}
            >
              Pending Fines
            </button>

            <button
              onClick={() => setFilter("paid")}
              className={`px-4 py-2 rounded font-semibold ${
                filter === "paid"
                  ? "bg-indigo-600 text-white"
                  : isDarkMode
                  ? "bg-gray-700"
                  : "bg-gray-200"
              }`}
            >
              Paid Fines
            </button>

            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded font-semibold ${
                filter === "all"
                  ? "bg-indigo-600 text-white"
                  : isDarkMode
                  ? "bg-gray-700"
                  : "bg-gray-200"
              }`}
            >
              All Fines
            </button>
          </div>

          {/* Search */}
          <div className="relative">
            <FiSearch
              size={20}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search by student name or book title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                isDarkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-300"
              }`}
            />
          </div>

          {/* Summary */}
          <div
            className={`p-6 rounded-xl border shadow-sm ${
              isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
            }`}
          >
            <p className="text-lg font-semibold">
              Total amount:{" "}
              <span className="text-indigo-600 dark:text-indigo-400">₹{totalAmount}</span>
            </p>
          </div>

          {/* Table */}
          <div
            className={`rounded-xl border shadow-sm overflow-hidden ${
              isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
            }`}
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead
                  className={`${isDarkMode ? "bg-gray-700" : "bg-gray-100"}`}
                >
                  <tr>
                    <th className="px-6 py-4 text-left">Student</th>
                    <th className="px-6 py-4 text-left">Book</th>
                    <th className="px-6 py-4 text-center">Days Overdue</th>
                    <th className="px-6 py-4 text-right">Fine Amount</th>
                    <th className="px-6 py-4 text-center">Status</th>
                    <th className="px-6 py-4 text-center">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredFinesList.map((fine) => (
                    <tr
                      key={fine._id}
                      className={`border-t ${
                        isDarkMode
                          ? "border-gray-700 hover:bg-gray-700"
                          : "border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      <td className="px-6 py-5">
                        <p className="font-semibold">{fine.userId?.name}</p>
                        <p className="text-sm text-gray-500">
                          {fine.userId?.email}
                        </p>
                      </td>

                      <td className="px-6 py-5">{fine.bookId?.title}</td>

                      <td className="px-6 py-5 text-center">
                        {fine.daysOverdue} days
                      </td>

                      <td className="px-6 py-5 text-right font-bold text-indigo-600 dark:text-indigo-400">
                        ₹{fine.totalFine}
                      </td>

                      <td className="px-6 py-5 text-center">
                        <span
                          className={`px-3 py-1 rounded text-sm font-semibold ${
                            fine.status === "pending"
                              ? "bg-red-100 text-red-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {fine.status === "pending" ? "⏳ Pending" : "✅ Paid"}
                        </span>
                      </td>

                      <td className="px-6 py-5 text-center">
                        {fine.status === "pending" ? (
                          <button
                            onClick={() => handlePayFine(fine._id)}
                            className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded text-sm flex items-center gap-1 justify-center"
                          >
                            <FiCheck size={16} />
                            Mark Paid
                          </button>
                        ) : (
                          <span className="text-gray-500 text-sm">
                            Paid on{" "}
                            {new Date(fine.paidDate).toLocaleDateString()}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredFinesList.length === 0 && (
              <div className="p-6 text-center text-gray-500">No fines found.</div>
            )}
          </div>
        </div>
      </DashboardMain>
    </div>
  );
};

export default AdminFines;