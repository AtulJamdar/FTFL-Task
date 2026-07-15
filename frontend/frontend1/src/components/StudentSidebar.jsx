import React from "react";
import { FiHome, FiBookOpen, FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import { useAuth } from "../hooks/useAuth";
import { BookMarked } from "lucide-react";

const StudentSidebar = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const menuItems = [
    { name: "Dashboard", icon: FiHome, path: "/student/dashboard" },
    { name: "Request Book", icon: FiBookOpen, path: "/student/requests" },
  ];

  return (
    <aside
      className={`w-64 min-h-screen flex-shrink-0 flex flex-col justify-between border-r ${
        isDarkMode
          ? "bg-gray-950 border-gray-800 text-white"
          : "bg-white border-gray-200 text-gray-900"
      }`}
    >
      <div>
        <button
          type="button"
          onClick={() => navigate("/student/dashboard")}
          className={`w-full p-6 flex items-center gap-3 text-left border-b transition-colors ${
            isDarkMode
              ? "border-gray-800 hover:bg-gray-900/80"
              : "border-gray-100 hover:bg-gray-50"
          }`}
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-600/25 shrink-0">
            <BookMarked className="w-5 h-5" strokeWidth={2} aria-hidden />
          </span>
          <div>
            <div className="font-bold text-sm leading-tight">BookNest</div>
            <div
              className={`text-xs font-medium ${
                isDarkMode ? "text-gray-500" : "text-gray-500"
              }`}
            >
              Student
            </div>
          </div>
        </button>

        <nav className="p-3 space-y-1">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={index}
                type="button"
                onClick={() => navigate(item.path)}
                className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-left text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 dark:hover:text-white transition-colors"
              >
                <Icon size={18} />
                {item.name}
              </button>
            );
          })}
        </nav>
      </div>

      <div
        className={`p-3 border-t ${
          isDarkMode ? "border-gray-800" : "border-gray-100"
        }`}
      >
        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-red-600 hover:text-white transition-colors"
        >
          <FiLogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default StudentSidebar;
