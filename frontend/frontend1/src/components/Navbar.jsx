import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';
import { FiSun, FiMoon, FiLogOut, FiMenu, FiX, FiChevronDown } from 'react-icons/fi';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [adminDropdown, setAdminDropdown] = useState(false);

  const isLanding = !user && location.pathname === '/';

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} shadow-lg`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1
              className="text-2xl font-bold cursor-pointer hover:opacity-80"
              onClick={() => {
                if (!user) {
                  navigate('/');
                  return;
                }
                if (user.role === 'admin') {
                  navigate('/admin/dashboard');
                } else {
                  navigate('/student/dashboard');
                }
              }}
            >
              📚 LibraryMS
            </h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {isLanding && (
              <>
                <a href="#features" className="text-sm hover:text-blue-500">
                  Home
                </a>
                <a href="#about" className="text-sm hover:text-blue-500">
                  About
                </a>
                <a href="#testimonials" className="text-sm hover:text-blue-500">
                  Testimonials
                </a>
                <a href="#contact" className="text-sm hover:text-blue-500">
                  Contact
                </a>
              </>
            )}

            {user && (
              <>
                <span className="text-sm">Welcome, {user.name}!</span>
                
                {user.role === 'admin' && (
                  <div className="relative group">
                    <button
                      className={`px-4 py-2 rounded flex items-center gap-1 ${
                        isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                      }`}
                    >
                      Admin Menu
                      <FiChevronDown size={16} />
                    </button>
                    <div className={`absolute right-0 mt-2 w-56 rounded-lg shadow-lg hidden group-hover:block z-10 ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`}>
                      <button
                        onClick={() => navigate('/admin/dashboard')}
                        className={`block w-full text-left px-4 py-2 ${isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-100'}`}
                      >
                        📊 Dashboard
                      </button>
                      <button
                        onClick={() => navigate('/admin/books')}
                        className={`block w-full text-left px-4 py-2 ${isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-100'}`}
                      >
                        📚 Manage Books
                      </button>
                      <button
                        onClick={() => navigate('/admin/users')}
                        className={`block w-full text-left px-4 py-2 ${isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-100'}`}
                      >
                        👥 Manage Users
                      </button>
                      <button
                        onClick={() => navigate('/admin/issues')}
                        className={`block w-full text-left px-4 py-2 ${isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-100'}`}
                      >
                        🔄 Manage Issues
                      </button>
                      <button
                        onClick={() => navigate('/admin/issue-book')}
                        className={`block w-full text-left px-4 py-2 ${isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-100'}`}
                      >
                        📕 Issue Book
                      </button>
                      <button
                        onClick={() => navigate('/admin/requests')}
                        className={`block w-full text-left px-4 py-2 ${isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-100'}`}
                      >
                        📝 Book Requests
                      </button>
                      <button
                        onClick={() => navigate('/admin/fines')}
                        className={`block w-full text-left px-4 py-2 ${isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-100'}`}
                      >
                        💰 Fine Management
                      </button>
                      <button
                        onClick={() => navigate('/admin/reports')}
                        className={`block w-full text-left px-4 py-2 ${isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-100'}`}
                      >
                        📄 Reports
                      </button>
                      <button
                        onClick={() => navigate('/admin/analytics')}
                        className={`block w-full text-left px-4 py-2 ${isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-100'}`}
                      >
                        📈 Analytics
                      </button>
                    </div>
                  </div>
                )}

                {user.role === 'user' && (
                  <div className="relative group">
                    <button
                      className={`px-4 py-2 rounded flex items-center gap-1 ${
                        isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                      }`}
                    >
                      My Menu
                      <FiChevronDown size={16} />
                    </button>
                    <div className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg hidden group-hover:block z-10 ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`}>
                      <button
                        onClick={() => navigate('/student/dashboard')}
                        className={`block w-full text-left px-4 py-2 ${isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-100'}`}
                      >
                        📊 Dashboard
                      </button>
                      <button
                        onClick={() => navigate('/student/requests')}
                        className={`block w-full text-left px-4 py-2 ${isDarkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-100'}`}
                      >
                        📝 My Requests
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg ${
                isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
              }`}
              title="Toggle theme"
            >
              {isDarkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>

            {/* Logout */}
            {isLanding && (
              <>
                <button
                  onClick={() => navigate('/login')}
                  className="px-4 py-2 text-sm rounded border border-gray-300 hover:bg-gray-100"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate('/register')}
                  className="px-4 py-2 text-sm rounded bg-blue-600 text-white hover:bg-blue-700"
                >
                  Sign Up
                </button>
              </>
            )}

            {user && (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
              >
                <FiLogOut size={18} />
                Logout
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg ${
                isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
              }`}
            >
              {isDarkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`p-2 rounded`}
            >
              {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className={`md:hidden pb-4 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            {isLanding && (
              <div className="flex flex-col gap-2 px-4 py-2 text-sm">
                <button
                  onClick={() => {
                    navigate('/');
                    setMenuOpen(false);
                  }}
                  className="text-left py-1"
                >
                  Home
                </button>
                <a
                  href="#about"
                  onClick={() => setMenuOpen(false)}
                  className="py-1"
                >
                  About
                </a>
                <a
                  href="#testimonials"
                  onClick={() => setMenuOpen(false)}
                  className="py-1"
                >
                  Testimonials
                </a>
                <a
                  href="#contact"
                  onClick={() => setMenuOpen(false)}
                  className="py-1"
                >
                  Contact
                </a>
                <button
                  onClick={() => {
                    navigate('/login');
                    setMenuOpen(false);
                  }}
                  className="mt-2 w-full text-left px-2 py-2 rounded bg-blue-600 text-white"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    navigate('/register');
                    setMenuOpen(false);
                  }}
                  className="mt-2 w-full text-left px-2 py-2 rounded border border-blue-500 text-blue-500"
                >
                  Sign Up
                </button>
              </div>
            )}

            {user && (
              <>
                <p className="px-4 py-2 text-sm font-semibold">{user.name}</p>
                
                {user.role === 'admin' && (
                  <>
                    <button
                      onClick={() => {
                        navigate('/admin/dashboard');
                        setMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-600"
                    >
                      📊 Dashboard
                    </button>
                    <button
                      onClick={() => {
                        navigate('/admin/books');
                        setMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-600"
                    >
                      📚 Manage Books
                    </button>
                    <button
                      onClick={() => {
                        navigate('/admin/users');
                        setMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-600"
                    >
                      👥 Manage Users
                    </button>
                    <button
                      onClick={() => {
                        navigate('/admin/issues');
                        setMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-600"
                    >
                      🔄 Manage Issues
                    </button>
                    <button
                      onClick={() => {
                        navigate('/admin/issue-book');
                        setMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-600"
                    >
                      📕 Issue Book
                    </button>
                    <button
                      onClick={() => {
                        navigate('/admin/requests');
                        setMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-600"
                    >
                      📝 Book Requests
                    </button>
                    <button
                      onClick={() => {
                        navigate('/admin/fines');
                        setMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-600"
                    >
                      💰 Fines
                    </button>
                    <button
                      onClick={() => {
                        navigate('/admin/reports');
                        setMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-600"
                    >
                      📄 Reports
                    </button>
                    <button
                      onClick={() => {
                        navigate('/admin/analytics');
                        setMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-600"
                    >
                      📈 Analytics
                    </button>
                  </>
                )}

                {user.role === 'user' && (
                  <>
                    <button
                      onClick={() => {
                        navigate('/student/dashboard');
                        setMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-600"
                    >
                      📊 Dashboard
                    </button>
                    <button
                      onClick={() => {
                        navigate('/student/requests');
                        setMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-600"
                    >
                      📝 My Requests
                    </button>
                  </>
                )}

                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-600"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;