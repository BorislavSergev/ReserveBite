import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../../firebase'; // Firebase auth instance
import { FaUserCircle } from 'react-icons/fa';

const Header = () => {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const { displayName, email, role } = currentUser;
        const [firstName = '', lastName = ''] = (displayName || email.split('@')[0]).split(' ');
        setUser({ firstName, lastName, role });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    navigate('/login');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-white shadow relative z-50">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <a href="/" className="text-xl font-bold">ReserveBite</a>
          <nav>
            <ul className="flex items-center space-x-4">
              {!user ? (
                <>
                  <li><a href="/login" className="text-gray-700 hover:text-secondary">Login</a></li>
                  <li><a href="/register" className="text-gray-700 hover:text-secondary">Register</a></li>
                </>
              ) : (
                <li className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setMenuOpen((prev) => !prev)}
                    className="flex items-center space-x-2 text-gray-700 hover:text-secondary"
                  >
                    <FaUserCircle className="text-xl" />
                    <span>Hello, {user.firstName}</span>
                  </button>
                  {menuOpen && (
                    <div
                      className="absolute end-0 z-10 mt-0.5 w-56 divide-y divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg"
                      role="menu"
                    >
                      <div className="p-2">
                        <a
                          href="/profile"
                          className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                          role="menuitem"
                        >
                          My profile
                        </a>
                        {user.role === 'business' && (
                          <a
                            href="/business"
                            className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                            role="menuitem"
                          >
                            Business
                          </a>
                        )}
                      </div>
                      <div className="p-2">
                        <button
                          onClick={handleLogout}
                          className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                          role="menuitem"
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
