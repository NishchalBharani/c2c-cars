import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Car, User, Menu, X, Search, PlusCircle, LogOut, User as UserIcon } from 'lucide-react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const navItems = [
    { path: '/search', label: 'Browse Cars', icon: Search },
    { path: '/how-it-works', label: 'How It Works' },
    { path: '/sell', label: 'Sell Your Car', icon: PlusCircle },
  ];

  const isActivePath = (path) => location.pathname === path;

  const handleLogout = () => {
    dispatch(logout());
    setIsProfileOpen(false);
    setIsOpen(false);
    navigate('/');
  };

  const handleProfileClick = () => {
    navigate('/auth/profile');
    setIsProfileOpen(false);
    setIsOpen(false);
  };

  return (
    <nav className="bg-white/90 backdrop-blur-md border-b border-gray-100 fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-3 group"
            onClick={() => setIsOpen(false)}
          >
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
              <Car className="w-7 h-7 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">C2C Cars</div>
              <div className="text-xs text-gray-500 -mt-1">Peer-to-Peer Marketplace</div>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-2xl font-medium transition-all duration-200 ${
                    isActivePath(item.path)
                      ? 'bg-blue-50 text-blue-600 border border-blue-200'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Desktop Auth/Profile Button */}
          <div className="hidden lg:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-2xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <UserIcon className="w-5 h-5" />
                  <span>{user?.fullName || 'Profile'}</span>
                </button>
                
                {/* Profile Dropdown */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-2xl border border-gray-200 py-2 z-50">
                    <button
                      onClick={handleProfileClick}
                      className="flex items-center space-x-3 w-full px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                    >
                      <User className="w-4 h-4" />
                      <span>My Profile</span>
                    </button>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 transition-colors duration-200"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/auth/login"
                className="flex items-center space-x-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-2xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <User className="w-5 h-5" />
                <span>Login</span>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleProfileClick}
                  className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-xl font-medium hover:bg-blue-700 transition duration-200"
                >
                  <UserIcon className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="p-2 rounded-xl text-gray-700 hover:bg-gray-100 focus:outline-none transition duration-200"
                >
                  {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            ) : (
              <>
                <Link
                  to="/auth/login"
                  className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-xl font-medium hover:bg-blue-700 transition duration-200"
                >
                  <User className="w-4 h-4" />
                </Link>
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="p-2 rounded-xl text-gray-700 hover:bg-gray-100 focus:outline-none transition duration-200"
                >
                  {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white/95 backdrop-blur-md">
            <div className="px-2 pt-4 pb-6 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-3 px-4 py-4 rounded-2xl font-medium transition-all duration-200 ${
                      isActivePath(item.path)
                        ? 'bg-blue-50 text-blue-600 border border-blue-200'
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {Icon && <Icon className="w-5 h-5" />}
                    <span className="text-lg">{item.label}</span>
                  </Link>
                );
              })}
              
              {isAuthenticated ? (
                <div className="pt-4 border-t border-gray-200 space-y-2">
                  <button
                    onClick={handleProfileClick}
                    className="flex items-center space-x-3 w-full px-4 py-4 rounded-2xl font-semibold bg-blue-600 text-white hover:bg-blue-700 transition duration-200"
                  >
                    <UserIcon className="w-5 h-5" />
                    <span className="text-lg">My Profile</span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-3 w-full px-4 py-4 rounded-2xl font-semibold bg-red-600 text-white hover:bg-red-700 transition duration-200"
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="text-lg">Logout</span>
                  </button>
                </div>
              ) : (
                <div className="pt-4 border-t border-gray-200">
                  <Link
                    to="/auth/login"
                    className="flex items-center space-x-3 px-4 py-4 rounded-2xl font-semibold bg-blue-600 text-white hover:bg-blue-700 transition duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    <User className="w-5 h-5" />
                    <span className="text-lg">Login to Your Account</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;