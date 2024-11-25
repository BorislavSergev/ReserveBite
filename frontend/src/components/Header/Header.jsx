import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const Header = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isOffCanvasOpen, setIsOffCanvasOpen] = useState(false);
    const [isSticky, setIsSticky] = useState(false);
    const dropdownRef = useRef(null);

    // Toggle Dropdown Menu
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    // Toggle Off-Canvas Menu (Mobile)
    const toggleOffCanvas = () => {
        setIsOffCanvasOpen(!isOffCanvasOpen);
    };

    // Close Dropdown when clicking outside
    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsDropdownOpen(false);
        }
    };

    // Handle Scroll to make the header sticky
    const handleScroll = () => {
        if (window.scrollY > 50) {
            setIsSticky(true);
        } else {
            setIsSticky(false);
        }
    };

    // UseEffect to add event listeners for clicks outside and scroll
    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        window.addEventListener('scroll', handleScroll);

        // Cleanup event listeners on unmount
        return () => {
            document.removeEventListener('click', handleClickOutside);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <header className={`bg-white shadow transition-all ${isSticky ? 'fixed top-0 left-0 right-0 z-50' : ''}`}>
                <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        {/* Logo */}
                        <a className="block text-secondary font-bold text-2xl" href="/">
                            ReserveBite
                        </a>

                        {/* Desktop Navigation */}
                        <nav aria-label="Global" className="hidden md:block">
                            <ul className="flex items-center gap-6 text-sm">
                                <li><a className="text-gray-500 transition hover:text-gray-500/75" href="#">About</a></li>
                                <li><a className="text-gray-500 transition hover:text-gray-500/75" href="#">Careers</a></li>
                                <li><a className="text-gray-500 transition hover:text-gray-500/75" href="#">History</a></li>
                                <li><a className="text-gray-500 transition hover:text-gray-500/75" href="#">Services</a></li>
                                <li><a className="text-gray-500 transition hover:text-gray-500/75" href="/login">Login</a></li>
                                <li><a className="text-gray-500 transition hover:text-gray-500/75" href="/register">Register</a></li>
                            </ul>
                        </nav>

                        {/* Profile Dropdown for Desktop */}
                        <div className="relative hidden md:block" ref={dropdownRef}>
                            <button
                                onClick={toggleDropdown}
                                className="overflow-hidden rounded-full border border-gray-300 shadow-inner"
                            >
                                <span className="sr-only">Toggle dashboard menu</span>
                                <img
                                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                    alt="User profile"
                                    className="h-10 w-10 object-cover"
                                />
                            </button>

                            {isDropdownOpen && (
                                <motion.div
                                    className="absolute right-0 z-[999] mt-2 w-48 divide-y divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg"
                                    role="menu"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="p-2">
                                        <a href="#" className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700">My profile</a>
                                        <a href="#" className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700">Billing summary</a>
                                        <a href="#" className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700">Team settings</a>
                                    </div>
                                    <div className="p-2">
                                        <form method="POST" action="#">
                                            <button
                                                type="submit"
                                                className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                                            >
                                                Logout
                                            </button>
                                        </form>
                                    </div>
                                </motion.div>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden">
                            <button
                                onClick={toggleOffCanvas}
                                className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Off-Canvas Menu */}
                {isOffCanvasOpen && (
                    <motion.div
                        className="fixed top-0 right-0 w-64 bg-white h-full z-20 shadow-lg"
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="p-4">
                            <button
                                onClick={toggleOffCanvas}
                                className="mb-4 rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                            <nav>
                                <ul className="space-y-2 text-sm">
                                    <li><a className="block text-gray-700 transition hover:bg-gray-100 p-2 rounded" href="#">About</a></li>
                                    <li><a className="block text-gray-700 transition hover:bg-gray-100 p-2 rounded" href="#">Careers</a></li>
                                    <li><a className="block text-gray-700 transition hover:bg-gray-100 p-2 rounded" href="#">History</a></li>
                                    <li><a className="block text-gray-700 transition hover:bg-gray-100 p-2 rounded" href="#">Services</a></li>
                                    <li><a className="block text-gray-700 transition hover:bg-gray-100 p-2 rounded" href="#">Projects</a></li>
                                    <li><a className="block text-gray-700 transition hover:bg-gray-100 p-2 rounded" href="#">Blog</a></li>
                                </ul>
                            </nav>

                            {/* Profile Dropdown inside Off-Canvas */}
                            <div className="mt-6 relative" ref={dropdownRef}>
                                <button
                                    onClick={toggleDropdown}
                                    className="overflow-hidden rounded-full border border-gray-300 shadow-inner"
                                >
                                    <img
                                        src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                        alt="User profile"
                                        className="h-10 w-10 object-cover"
                                    />
                                </button>
                                {isDropdownOpen && (
                                    <motion.div
                                        className="absolute bottom-0 left-0 w-full divide-y divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg"
                                        role="menu"
                                        initial={{ opacity: 0, y: '100%' }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: '100%' }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="p-2">
                                            <a href="#" className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700">My profile</a>
                                            <a href="#" className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700">Billing summary</a>
                                            <a href="#" className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700">Team settings</a>
                                        </div>
                                        <div className="p-2">
                                            <form method="POST" action="#">
                                                <button
                                                    type="submit"
                                                    className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                                                >
                                                    Logout
                                                </button>
                                            </form>
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </header>
        </>
    );
};

export default Header;
