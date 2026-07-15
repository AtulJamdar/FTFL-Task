import React, { useState, useEffect } from "react";
import { useTheme } from "../../hooks/useTheme";
import axios from "axios";
import { FiDownload, FiFileText } from "react-icons/fi";
import AdminSidebar from "../../components/AdminSidebar";
import DashboardMain from "../../components/layout/DashboardMain";

import {
  generateBooksReport,
  generateUsersReport,
  generateIssuesReport,
  generateFinesReport,
  exportBooksToExcel,
  exportUsersToExcel,
  exportIssuesToExcel,
  exportFinesToExcel,
} from "../../services/reportService";

const AdminReports = () => {
  const { isDarkMode } = useTheme();
  const [data, setData] = useState({
    books: [],
    users: [],
    issues: [],
    fines: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      setLoading(true);

      const [booksRes, usersRes, issuesRes, finesRes] = await Promise.all([
        axios.get("http://localhost:5000/api/books"),
        axios.get("http://localhost:5000/api/users"),
        axios.get("http://localhost:5000/api/issues"),
        axios.get("http://localhost:5000/api/fines"),
      ]);

      setData({
        books: booksRes.data.books,
        users: usersRes.data.users,
        issues: issuesRes.data.issues,
        fines: finesRes.data.fines,
      });
    } catch (error) {
      setError("Error fetching data for reports");
    } finally {
      setLoading(false);
    }
  };

  const ReportCard = ({
    title,
    description,
    icon: Icon,
    onPDF,
    onExcel,
    count,
  }) => (
    <div
      className={`p-6 rounded-xl border shadow-sm ${
        isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      }`}
    >
      <div className="flex items-start justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-indigo-600 text-white rounded-lg shadow-sm">
            <Icon size={24} />
          </div>

          <div>
            <h3 className="font-bold text-lg">{title}</h3>
            <p
              className={`text-sm ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {count} records
            </p>
          </div>
        </div>
      </div>

      <p
        className={`text-sm mb-5 leading-relaxed ${
          isDarkMode ? "text-gray-400" : "text-gray-600"
        }`}
      >
        {description}
      </p>

      <div className="flex gap-3">
        <button
          onClick={onPDF}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded font-semibold text-sm"
        >
          <FiDownload size={16} />
          PDF
        </button>

        <button
          onClick={onExcel}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded font-semibold text-sm"
        >
          <FiDownload size={16} />
          Excel
        </button>
      </div>
    </div>
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
          <p className="font-medium animate-pulse">Loading reports...</p>
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
        heroTitle="Reports & exports"
        heroSubtitle="Download PDF summaries or Excel spreadsheets for books, users, issues, and fines."
      >
        <div className="space-y-10">
          {error && (
            <div className="p-4 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {/* Report Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">

            <ReportCard
              title="Books Report"
              description="Download detailed report of all books in the library"
              icon={FiFileText}
              count={data.books.length}
              onPDF={() => generateBooksReport(data.books)}
              onExcel={() => exportBooksToExcel(data.books)}
            />

            <ReportCard
              title="Users Report"
              description="Download list of all registered users and admins"
              icon={FiFileText}
              count={data.users.length}
              onPDF={() => generateUsersReport(data.users)}
              onExcel={() => exportUsersToExcel(data.users)}
            />

            <ReportCard
              title="Issues Report"
              description="Download report of all book issues and returns"
              icon={FiFileText}
              count={data.issues.length}
              onPDF={() => generateIssuesReport(data.issues)}
              onExcel={() => exportIssuesToExcel(data.issues)}
            />

            <ReportCard
              title="Fines Report"
              description="Download detailed fines report"
              icon={FiFileText}
              count={data.fines.length}
              onPDF={() => generateFinesReport(data.fines)}
              onExcel={() => exportFinesToExcel(data.fines)}
            />
          </div>

          {/* Summary Section */}
          <div
            className={`p-8 rounded-xl border shadow-sm ${
              isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
            }`}
          >
            <h2 className="text-2xl font-bold mb-6 tracking-tight">Summary statistics</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

              <div
                className={`p-5 rounded ${
                  isDarkMode ? "bg-gray-700" : "bg-gray-100"
                }`}
              >
                <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                  {data.books.length}
                </p>
                <p className="text-sm">Total Books</p>
              </div>

              <div
                className={`p-5 rounded ${
                  isDarkMode ? "bg-gray-700" : "bg-gray-100"
                }`}
              >
                <p className="text-3xl font-bold text-violet-600 dark:text-violet-400">
                  {data.users.length}
                </p>
                <p className="text-sm">Total Users</p>
              </div>

              <div
                className={`p-5 rounded ${
                  isDarkMode ? "bg-gray-700" : "bg-gray-100"
                }`}
              >
                <p className="text-3xl font-bold text-green-500">
                  {data.issues.length}
                </p>
                <p className="text-sm">Total Issues</p>
              </div>

              <div
                className={`p-5 rounded ${
                  isDarkMode ? "bg-gray-700" : "bg-gray-100"
                }`}
              >
                <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                  ₹{data.fines.reduce((sum, f) => sum + f.totalFine, 0)}
                </p>
                <p className="text-sm">Total Fines</p>
              </div>

            </div>
          </div>

        </div>
      </DashboardMain>
    </div>
  );
};

export default AdminReports;