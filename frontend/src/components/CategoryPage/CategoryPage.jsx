import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaFilter, FaStar } from 'react-icons/fa'; // Add Star icon for Rating

const CategoryPage = () => {
    const { categoryName } = useParams();
    const [isFilterOpen, setIsFilterOpen] = useState(false); // Off-canvas visibility state

    const toggleFilter = () => {
        setIsFilterOpen(!isFilterOpen);
    };

    // Ensure page scrolls to top when loaded
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="flex flex-row container mx-auto py-8 px-4 bg-primary">
            {/* Off-Canvas Filters for Mobile */}
            <motion.div
                className={`fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end sm:hidden ${isFilterOpen ? "visible" : "invisible"}`}
                initial={{ x: '100%' }}
                animate={isFilterOpen ? { x: 0 } : { x: '100%' }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                onClick={toggleFilter} // Close the filter when clicking outside
            >
                <motion.div
                    className="bg-acent text-white w-4/5 max-w-xs p-6 rounded-l-lg shadow-lg relative"
                    onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
                    initial={{ opacity: 0 }}
                    animate={isFilterOpen ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                >
                    {/* Close Button */}
                    <button
                        className="absolute top-4 left-4 bg-secondary text-primary rounded-full p-2 focus:outline-none"
                        onClick={toggleFilter}
                    >
                        ✕
                    </button>

                    {/* Filters Header */}
                    <h3 className="text-xl font-bold mb-6 mt-10">Filters</h3>

                    {/* Filter Options (e.g., Moods) */}
                    <div className="mb-6">
                        <label className="block text-lg font-medium mb-2">Category</label>
                        <div className="space-y-2">
                            {["Energetic", "Dark", "Sad", "Happy", "Angry"].map((mood) => (
                                <label key={mood} className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        name="mood"
                                        value={mood.toLowerCase()}
                                        className="form-checkbox h-5 w-5 text-secondary focus:ring-secondary"
                                    />
                                    <span className="text-white">{mood}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Rating Filter */}
                    <div className="mb-6">
                        <label className="block text-lg font-medium mb-2">Rating</label>
                        <div className="space-y-2">
                            {["1 Star", "2 Stars", "3 Stars", "4 Stars", "5 Stars"].map((rating) => (
                                <label key={rating} className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        name="rating"
                                        value={rating.toLowerCase().replace(/\s+/g, "-")}
                                        className="form-checkbox h-5 w-5 text-secondary focus:ring-secondary"
                                    />
                                    <span className="text-white">{rating}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Apply Filters Button */}
                    <motion.button
                        className="bg-secondary text-primary font-bold py-3 px-6 rounded-md w-full transition-transform transform hover:scale-105"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        onClick={toggleFilter}
                    >
                        Apply Filters
                    </motion.button>
                </motion.div>
            </motion.div>

            {/* Filters for Larger Screens */}
            <motion.div
                className="hidden sm:block w-full sm:w-1/4 bg-acent text-white p-6 rounded-lg shadow-xl h-[85vh]"
                style={{ position: 'sticky', top: '6rem' }}
                initial={{ x: -200, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                {/* Filters Header */}
                <h3 className="text-2xl font-bold mb-6 mt-10 flex items-center space-x-2">
                    <FaFilter className="text-white mr-2" />
                    <span>Filters</span>
                </h3>

                {/* Filter Options */}
                <div className="mb-6">
                    <label className="block text-lg font-medium mb-2">Category</label>
                    <div className="space-y-2">
                        {["Energetic", "Dark", "Sad", "Happy", "Angry"].map((mood) => (
                            <label key={mood} className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    name="mood"
                                    value={mood.toLowerCase()}
                                    className="form-checkbox h-5 w-5 text-secondary focus:ring-secondary"
                                />
                                <span>{mood}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Rating Filter */}
                <div className="mb-6">
                    <label className="block text-lg font-medium mb-2">Rating</label>
                    <div className="space-y-2">
                        {["1 Star", "2 Stars", "3 Stars", "4 Stars", "5 Stars"].map((rating) => (
                            <label key={rating} className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    name="rating"
                                    value={rating.toLowerCase().replace(/\s+/g, "-")}
                                    className="form-checkbox h-5 w-5 text-secondary focus:ring-secondary"
                                />
                                <span>{rating}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Apply Filters Button */}
                <motion.button
                    className="bg-secondary text-primary font-bold py-3 px-6 rounded-md w-full transition-transform transform hover:scale-105"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                >
                    Apply Filters
                </motion.button>
            </motion.div>

            {/* Main Content */}
            <div className="w-full sm:w-3/4 ml-0 sm:ml-6">
                {/* Header with Filter Button */}
                <div className="flex justify-between items-center mb-8">
                    {/* Page Title */}
                    <motion.h2
                        className="text-2xl sm:text-3xl font-bold text-txtPrimary"
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        {categoryName} Restaurants
                    </motion.h2>

                    {/* Filter Button for Mobile */}
                    <button
                        className="sm:hidden flex items-center bg-secondary text-primary font-bold py-2 px-4 rounded-md transition-transform transform hover:scale-105"
                        onClick={toggleFilter}
                    >
                        <FaFilter className="mr-2" />
                        <span>Filters</span>
                    </button>
                </div>

                {/* Restaurant List */}
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                >
                    {[...Array(48)].map((_, index) => (
                        <motion.div
                            key={index}
                            className="bg-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Link to={`/restaurant/restaurant-${index + 1}`} className="block">
                                <img
                                    src="https://cdn.printnetwork.com/production/assets/themes/5966561450122033bd4456f8/imageLocker/5f206dc35d4bff1ada62fb4c/blog/blog-description/1647973541988_restaurant-banner.png"
                                    alt={`Restaurant ${index + 1}`}
                                    className="w-full h-40 object-cover rounded-lg mb-4"
                                />
                                <h3 className="text-xl font-bold text-acent mb-3">Restaurant {index + 1}</h3>
                                <div className="flex items-center mb-3">
                                    <FaStar className="text-yellow-500" />
                                    <span className="ml-1 text-lg">4.5</span>
                                </div>
                                <p className="text-txtSecondary mb-4">
                                    A little description about Restaurant {index + 1}. Explore delicious cuisines.
                                </p>
                                <button className="bg-secondary text-white px-6 py-2 rounded-md w-full hover:bg-accentTransition transition">
                                    View
                                </button>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default CategoryPage;
