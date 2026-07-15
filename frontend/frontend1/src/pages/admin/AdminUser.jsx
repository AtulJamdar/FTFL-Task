import React, { useState, useEffect } from "react";
import { useTheme } from "../../hooks/useTheme";
import axios from "axios";
import { FiTrash2, FiEye, FiSearch } from "react-icons/fi";
import UserDetailsModal from "../../components/UserDetailsModal";
import AdminSidebar from "../../components/AdminSidebar";
import DashboardMain from "../../components/layout/DashboardMain";

const AdminUsers = () => {
  const { isDarkMode } = useTheme();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/users");
      setUsers(response.data.users);
    } catch (error) {
      setError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    const confirmDelete = window.confirm(
      `Delete ${name}? Ensure they have no active issued books.`
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`);

      setUsers((prev) => prev.filter((user) => user._id !== id));

      setSuccess("User deleted successfully");
      setTimeout(() => setSuccess(""), 3000);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to delete user");
    }
  };

  const handleViewDetails = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
        }`}
      >
        <p className="text-lg font-medium">Loading users...</p>
      </div>
    );
  }

  return (
    <div
      className={`flex min-h-screen ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <AdminSidebar />

      <DashboardMain
        isDarkMode={isDarkMode}
        heroTitle="Manage users"
        heroSubtitle="View and manage registered patrons and staff in one place."
      >
        <div className="space-y-8">
          {/* Alerts */}
          {error && (
            <div
              className={`flex items-center justify-between p-4 rounded-xl border shadow-sm ${
                isDarkMode
                  ? "bg-red-900/20 border-red-700 text-red-300"
                  : "bg-red-50 border-red-200 text-red-600"
              }`}
            >
              <span className="text-sm font-medium">{error}</span>
              <button
                onClick={() => setError("")}
                className="text-lg font-semibold hover:opacity-70 transition"
              >
                ✕
              </button>
            </div>
          )}

          {success && (
            <div
              className={`flex items-center justify-between p-4 rounded-xl border shadow-sm ${
                isDarkMode
                  ? "bg-green-900/20 border-green-700 text-green-300"
                  : "bg-green-50 border-green-200 text-green-600"
              }`}
            >
              <span className="text-sm font-medium">{success}</span>
              <button
                onClick={() => setSuccess("")}
                className="text-lg font-semibold hover:opacity-70 transition"
              >
                ✕
              </button>
            </div>
          )}

          {/* Search */}
          <div
            className={`relative max-w-md rounded-xl border shadow-sm ${
              isDarkMode
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-200"
            }`}
          >
            <FiSearch
              size={20}
              className={`absolute left-3 top-1/2 -translate-y-1/2 ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}
            />
            <input
              type="text"
              placeholder="Search by name or email"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-3 rounded-xl bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            />
          </div>

          {/* Table Card */}
          <div
            className={`rounded-xl shadow-sm border overflow-hidden ${
              isDarkMode
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-200"
            }`}
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead
                  className={`text-xs uppercase tracking-wider ${
                    isDarkMode
                      ? "bg-gray-900 text-gray-400"
                      : "bg-gray-50 text-gray-500"
                  }`}
                >
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">Name</th>
                    <th className="px-6 py-4 text-left font-semibold">Email</th>
                    <th className="px-6 py-4 text-left font-semibold">Role</th>
                    <th className="px-6 py-4 text-left font-semibold">Joined</th>
                    <th className="px-6 py-4 text-center font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredUsers.map((user) => (
                    <tr
                      key={user._id}
                      className={`border-t transition-all duration-200 ${
                        isDarkMode
                          ? "border-gray-700 hover:bg-gray-700/40"
                          : "border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      <td className="px-6 py-4 font-medium">{user.name}</td>

                      <td
                        className={`px-6 py-4 text-sm ${
                          isDarkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        {user.email}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 text-xs font-semibold rounded-full ${
                            user.role === "admin"
                              ? "bg-red-500/10 text-red-600"
                              : "bg-blue-500/10 text-blue-600"
                          }`}
                        >
                          {user.role === "admin" ? "Admin" : "Student"}
                        </span>
                      </td>

                      <td
                        className={`px-6 py-4 text-sm ${
                          isDarkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex justify-center items-center gap-3">
                          <button
                            onClick={() => handleViewDetails(user)}
                            className="flex items-center justify-center p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 hover:-translate-y-0.5 transition-all duration-200"
                            title="View Details"
                          >
                            <FiEye size={18} />
                          </button>

                          <button
                            onClick={() =>
                              handleDelete(user._id, user.name)
                            }
                            className="flex items-center justify-center p-2 rounded-lg bg-red-600 text-white hover:bg-red-700 hover:-translate-y-0.5 transition-all duration-200"
                            title="Delete User"
                          >
                            <FiTrash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredUsers.length === 0 && (
              <div
                className={`p-10 text-center text-sm ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}
              >
                No users found.
              </div>
            )}
          </div>
        </div>
      </DashboardMain>

      {showModal && selectedUser && (
        <UserDetailsModal
          user={selectedUser}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default AdminUsers;