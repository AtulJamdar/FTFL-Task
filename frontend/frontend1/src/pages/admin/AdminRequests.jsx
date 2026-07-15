import React, { useState, useEffect } from "react";
import { useTheme } from "../../hooks/useTheme";
import axios from "axios";
import { FiCheck, FiX, FiSearch } from "react-icons/fi";
import RequestResponseModal from "../../components/RequestResponseModal";
import AdminSidebar from "../../components/AdminSidebar";
import DashboardMain from "../../components/layout/DashboardMain";

const AdminRequests = () => {
  const { isDarkMode } = useTheme();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("pending");
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [action, setAction] = useState("approve");

  useEffect(() => {
    fetchRequests();
  }, [filter]);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/requests");
      let filteredRequests = response.data.requests;

      if (filter === "pending") {
        filteredRequests = filteredRequests.filter((r) => r.status === "pending");
      } else if (filter === "approved") {
        filteredRequests = filteredRequests.filter((r) => r.status === "approved");
      } else if (filter === "rejected") {
        filteredRequests = filteredRequests.filter((r) => r.status === "rejected");
      }

      setRequests(filteredRequests);
    } catch (error) {
      setError("Error fetching requests");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = (request) => {
    setSelectedRequest(request);
    setAction("approve");
    setShowModal(true);
  };

  const handleReject = (request) => {
    setSelectedRequest(request);
    setAction("reject");
    setShowModal(true);
  };

  const handleSubmitResponse = async (responseMessage) => {
    try {
      const endpoint =
        action === "approve"
          ? `http://localhost:5000/api/requests/${selectedRequest._id}/approve`
          : `http://localhost:5000/api/requests/${selectedRequest._id}/reject`;

      await axios.put(endpoint, { responseMessage });

      setSuccess(`Request ${action}d successfully!`);
      setShowModal(false);
      fetchRequests();
      setTimeout(() => setSuccess(""), 3000);
    } catch (error) {
      setError(error.response?.data?.message || "Error processing request");
    }
  };

  const filteredRequestsList = requests.filter(
    (request) =>
      request.userId?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.bookId?.title.toLowerCase().includes(searchTerm.toLowerCase())
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
          <p className="font-medium animate-pulse">Loading requests...</p>
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
        heroTitle="Book requests"
        heroSubtitle="Review, approve, or reject patron holds—clear queue, calm library."
      >
        <div className="space-y-8 leading-relaxed">

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

          {/* Filters */}
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setFilter("pending")}
              className={`px-4 py-2 rounded font-semibold ${
                filter === "pending"
                  ? "bg-yellow-500 text-white"
                  : isDarkMode
                  ? "bg-gray-700"
                  : "bg-gray-200"
              }`}
            >
              Pending ({requests.filter((r) => r.status === "pending").length})
            </button>

            <button
              onClick={() => setFilter("approved")}
              className={`px-4 py-2 rounded font-semibold ${
                filter === "approved"
                  ? "bg-green-500 text-white"
                  : isDarkMode
                  ? "bg-gray-700"
                  : "bg-gray-200"
              }`}
            >
              Approved ({requests.filter((r) => r.status === "approved").length})
            </button>

            <button
              onClick={() => setFilter("rejected")}
              className={`px-4 py-2 rounded font-semibold ${
                filter === "rejected"
                  ? "bg-red-500 text-white"
                  : isDarkMode
                  ? "bg-gray-700"
                  : "bg-gray-200"
              }`}
            >
              Rejected ({requests.filter((r) => r.status === "rejected").length})
            </button>

            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded font-semibold ${
                filter === "all"
                  ? "bg-blue-500 text-white"
                  : isDarkMode
                  ? "bg-gray-700"
                  : "bg-gray-200"
              }`}
            >
              All Requests
            </button>
          </div>

          {/* Search */}
          <div className="relative">
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
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

          {/* Table */}
          <div
            className={`rounded-xl shadow-sm border overflow-hidden ${
              isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
            }`}
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className={`${isDarkMode ? "bg-gray-700" : "bg-gray-100"}`}>
                  <tr>
                    <th className="px-6 py-4 text-left">Student</th>
                    <th className="px-6 py-4 text-left">Book</th>
                    <th className="px-6 py-4 text-left">Message</th>
                    <th className="px-6 py-4 text-left">Status</th>
                    <th className="px-6 py-4 text-left">Requested</th>
                    <th className="px-6 py-4 text-center">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredRequestsList.map((request) => (
                    <tr
                      key={request._id}
                      className={`border-t ${
                        isDarkMode
                          ? "border-gray-700 hover:bg-gray-700"
                          : "border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      <td className="px-6 py-5">
                        <p className="font-semibold">{request.userId?.name}</p>
                        <p className="text-sm text-gray-500">
                          {request.userId?.email}
                        </p>
                      </td>

                      <td className="px-6 py-5">
                        <p className="font-semibold">{request.bookId?.title}</p>
                        <p className="text-sm text-gray-500">
                          {request.bookId?.author}
                        </p>
                      </td>

                      <td className="px-6 py-5 text-sm max-w-xs truncate">
                        {request.requestMessage || "No message"}
                      </td>

                      <td className="px-6 py-5">
                        <span
                          className={`px-3 py-1 rounded text-sm font-semibold ${
                            request.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : request.status === "approved"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {request.status}
                        </span>
                      </td>

                      <td className="px-6 py-5 text-sm">
                        {new Date(request.createdAt).toLocaleDateString()}
                      </td>

                      <td className="px-6 py-5">
                        {request.status === "pending" ? (
                          <div className="flex gap-3 justify-center">
                            <button
                              onClick={() => handleApprove(request)}
                              className="p-2 bg-green-500 hover:bg-green-600 text-white rounded"
                            >
                              <FiCheck size={18} />
                            </button>

                            <button
                              onClick={() => handleReject(request)}
                              className="p-2 bg-red-500 hover:bg-red-600 text-white rounded"
                            >
                              <FiX size={18} />
                            </button>
                          </div>
                        ) : (
                          <span className="text-gray-500 text-sm">
                            Processed
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredRequestsList.length === 0 && (
              <div className="p-6 text-center text-gray-500">No requests found.</div>
            )}
          </div>
        </div>
      </DashboardMain>

      {showModal && selectedRequest && (
        <RequestResponseModal
          request={selectedRequest}
          action={action}
          onSubmit={handleSubmitResponse}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default AdminRequests;