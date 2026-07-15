import React, { useState, useEffect } from "react";
import { useTheme } from "../../hooks/useTheme";
import axios from "axios";
import { FiBook, FiUsers, FiFileText, FiAlertCircle } from "react-icons/fi";
import AdminSidebar from "../../components/AdminSidebar";
import DashboardMain from "../../components/layout/DashboardMain";

const accentStyles = [
  "bg-indigo-100 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-300",
  "bg-violet-100 text-violet-600 dark:bg-violet-950/50 dark:text-violet-300",
  "bg-indigo-50 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-200",
  "bg-violet-50 text-violet-700 dark:bg-violet-900/40 dark:text-violet-200",
];

const AdminDashboard = () => {
  const { isDarkMode } = useTheme();

  const [stats, setStats] = useState({
    books: { totalBooks: 0, totalAvailableCopies: 0, totalIssuedCopies: 0 },
    users: {
      totalUsers: 0,
      totalStudents: 0,
      totalAdmins: 0,
      studentsWithActiveBooks: 0,
      studentsWithOverdueBooks: 0,
    },
    issues: { totalIssued: 0, totalReturned: 0, overdueBooks: 0 },
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [booksRes, usersRes, issuesRes] = await Promise.all([
        axios.get("http://localhost:5000/api/books/stats/dashboard"),
        axios.get("http://localhost:5000/api/users/stats/dashboard"),
        axios.get("http://localhost:5000/api/issues/stats/dashboard"),
      ]);

      setStats({
        books: booksRes.data,
        users: usersRes.data,
        issues: issuesRes.data,
      });
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const StatSquare = ({ icon: Icon, title, value, accentIndex = 0 }) => (
    <div
      className={`min-h-[160px] rounded-2xl border flex flex-col items-center justify-center text-center p-6 transition-all duration-300 hover:shadow-lg hover:border-indigo-200 dark:hover:border-indigo-800 ${
        isDarkMode
          ? "bg-gray-900/80 border-gray-800"
          : "bg-white border-gray-200 shadow-sm"
      }`}
    >
      <div
        className={`p-3 rounded-xl mb-3 ${accentStyles[accentIndex % accentStyles.length]}`}
      >
        <Icon size={22} />
      </div>
      <p className="text-3xl font-bold tabular-nums text-gray-900 dark:text-white">
        {value}
      </p>
      <p
        className={`text-sm mt-2 max-w-[12rem] ${
          isDarkMode ? "text-gray-400" : "text-gray-500"
        }`}
      >
        {title}
      </p>
    </div>
  );

  if (loading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
        }`}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 border-4 border-indigo-500/20 border-t-indigo-600 rounded-full animate-spin" />
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Loading dashboard…
          </p>
        </div>
      </div>
    );
  }

  const bookStats = [
    {
      icon: FiBook,
      title: "Total Books",
      value: stats.books.totalBooks,
    },
    {
      icon: FiBook,
      title: "Available Copies",
      value: stats.books.totalAvailableCopies,
    },
    {
      icon: FiBook,
      title: "Issued Copies",
      value: stats.books.totalIssuedCopies,
    },
  ];

  const userStats = [
    { icon: FiUsers, title: "Total Users", value: stats.users.totalUsers },
    { icon: FiUsers, title: "Students", value: stats.users.totalStudents },
    { icon: FiUsers, title: "Admins", value: stats.users.totalAdmins },
    {
      icon: FiFileText,
      title: "Students w/ Active Books",
      value: stats.users.studentsWithActiveBooks,
    },
    {
      icon: FiAlertCircle,
      title: "Overdue Students",
      value: stats.users.studentsWithOverdueBooks,
    },
  ];

  const issueStats = [
    {
      icon: FiFileText,
      title: "Books Issued",
      value: stats.issues.totalIssued,
    },
    {
      icon: FiFileText,
      title: "Books Returned",
      value: stats.issues.totalReturned,
    },
    {
      icon: FiAlertCircle,
      title: "Overdue Books",
      value: stats.issues.overdueBooks,
    },
  ];

  return (
    <div
      className={`flex min-h-screen ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <AdminSidebar />

      <DashboardMain
        isDarkMode={isDarkMode}
        heroTitle="Dashboard overview"
        heroSubtitle="Live snapshot of your library—books, patrons, and circulation in one place."
      >
        <section className="mb-14 text-center">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Books
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {bookStats.map((s, i) => (
              <StatSquare
                key={s.title}
                icon={s.icon}
                title={s.title}
                value={s.value}
                accentIndex={i}
              />
            ))}
          </div>
        </section>

        <section className="mb-14 text-center">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Users
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {userStats.map((s, i) => (
              <StatSquare
                key={s.title}
                icon={s.icon}
                title={s.title}
                value={s.value}
                accentIndex={i}
              />
            ))}
          </div>
        </section>

        <section className="text-center">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Issues
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {issueStats.map((s, i) => (
              <StatSquare
                key={s.title}
                icon={s.icon}
                title={s.title}
                value={s.value}
                accentIndex={i}
              />
            ))}
          </div>
        </section>
      </DashboardMain>
    </div>
  );
};

export default AdminDashboard;
