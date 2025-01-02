import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Or clear cookies if using them
    alert("You have been logged out.");
    navigate('/login');
  };

  return (
    <nav className="bg-rose-200 text-gray-900 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo or title */}
        <Link 
          to="/" 
          className="font-bold text-2xl hover:text-pink-600 cursor-pointer">
          Makeup Studio
        </Link>
        
        {/* Navigation links and logout */}
        <div className="flex items-center space-x-4">
          <Link 
            to="/book" 
            className="hover:text-pink-600 cursor-pointer transition duration-300">
            Book Now
          </Link>
          <Link 
            to="/dashboard" 
            className="hover:text-pink-600 cursor-pointer transition duration-300">
            Dashboard
          </Link>
          <Link 
            to="/calendar" 
            className="hover:text-pink-600 cursor-pointer transition duration-300">
            Calendar
          </Link>
          <Link 
            to="/done" 
            className="hover:text-pink-600 cursor-pointer transition duration-300">
            Done
          </Link>
          <button 
            onClick={handleLogout} 
            className="flex items-center text-sm text-pink-600 hover:text-pink-800 transition duration-300">
            <FaSignOutAlt className="mr-1" /> Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
