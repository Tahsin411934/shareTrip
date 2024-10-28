import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../AuthProvider/AuthContext'; // Import the auth context for user authentication status
import { FaUser } from 'react-icons/fa'; // Import the user icon

const Navbar: React.FC = () => {
  const { user, logOut } = useAuth(); // Get authentication status and logout function
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const location = useLocation();

  const links = [
    { to: '/', label: 'Home' },
    { to: '/flight', label: 'Flight' },
    { to: '/bus', label: 'Bus' },
    { to: '/shop', label: 'Shop' },
    { to: '/holiday', label: 'Holiday' },
    { to: '/faq-support', label: 'FAQ & Support' },
  ];

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById('sidebar');
      const menuBtn = document.getElementById('menu-btn');
      if (
        isOpen &&
        sidebar &&
        menuBtn &&
        !sidebar.contains(event.target as Node) &&
        !menuBtn.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  const logoutUser = () => {
    logOut(); // Call logout function
  };

  return (
    <div>
      <nav className="bg-[#FFFFFF] px-4 py-2 font-Montserrat shadow-2xl">
        <div className="container lg:w-[85%] lg:gap-32 mx-auto flex items-center justify-between relative">
          <div className="text-white text-xl font-bold">
            <img src="logo.png" alt="Logo" className="h-10 w-36 mr-2" />
          </div>
          <div className="md:hidden">
            <button
              id="menu-btn"
              className="focus:outline-none relative z-20 flex flex-col space-y-1"
              onClick={toggleSidebar}
            >
              <span
                className={`block h-1 w-6 bg-gray-800 transition-transform duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`}
              ></span>
              <span
                className={`block h-1 w-6 bg-gray-800 transition-opacity duration-300 ${isOpen ? 'opacity-0' : ''}`}
              ></span>
              <span
                className={`block h-1 w-6 bg-gray-800 transition-transform duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}
              ></span>
            </button>
          </div>
          <div className="hidden font-semibold text-sm md:flex md:items-center md:space-x-6 list-none">
            {links.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className={`py-2 px-2 rounded-md transition duration-300 
                    ${location.pathname === link.to
                      ? 'text-yellow-700 '
                      : 'text-gray-700 hover:bg-blue-200 '
                    }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </div>

          {/* Conditionally render Login/Logout/Profile buttons */}
          <div className="hidden lg:flex flex-row-reverse gap-2 items-center space-x-4">
            {user ? ( // Check if user is authenticated
              <>
                <Link
                  to="/profile"
                  className="flex items-center  text-gray-950 rounded-3xl px-3 py-2 text-sm font-semibold"
                >
                  <FaUser className="mr-1" /> {/* Profile Icon */}
                </Link>
                <button
                  onClick={logoutUser} // Logout function
                  className="bg-blue-700 text-white rounded-3xl px-5 py-2 text-sm font-semibold"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="bg-blue-700 text-white rounded-3xl px-5 py-2 text-sm font-semibold"
                >
                  Login
                </Link>
                
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Sidebar for mobile */}
      <div
        id="sidebar"
        className={`fixed top-0 right-0 h-full bg-green-500 transition-all duration-300 z-10 md:hidden overflow-hidden ${isOpen ? 'w-3/4 opacity-100' : 'w-0 opacity-0'
          }`}
      >
        <div className="flex flex-col space-y-4 mt-12">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={`block py-2 px-4 text-white hover:bg-blue-700 rounded-md transition duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'
                }`}
            >
              {link.label}
            </NavLink>
          ))}

          {/* Mobile version of the Login/Logout/Profile buttons */}
          <div className="mt-4 space-y-2">
            {user ? (
              <>
                <Link
                  to="/profile"
                  className="block  text-white rounded-3xl px-5 py-2 text-sm font-semibold  items-center"
                >
                  <FaUser className="mr-1" /> 
                </Link>
                <button
                  onClick={logoutUser} // Logout function
                  className="block w-full bg-red-600 text-white rounded-3xl px-5 py-2 text-sm font-semibold"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block bg-blue-700 text-white rounded-3xl px-5 py-2 text-sm font-semibold"
                >
                  Login
                </Link>
                
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
