import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

const CategoryPage = () => {
    const { categoryName } = useParams();

    return (
        <div className="flex flex-row container mx-auto py-8 px-4 bg-primary">
            {/* Left-side Filters */}
            <motion.div
                className="w-full sm:w-1/4 bg-acent text-white p-6 rounded-lg shadow-xl"
                initial={{ x: -300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                <h3 className="text-xl sm:text-2xl font-bold mb-6">Filters</h3>
                
                {/* Category Filter */}
                <div className="mb-6">
                    <label className="block text-lg font-medium mb-2">Category</label>
                    <select className="w-full bg-primary text-white rounded-md p-3 mb-4 focus:outline-none">
                        <option value="all">All</option>
                        <option value="high">High Rated</option>
                        <option value="low">Low Rated</option>
                    </select>
                </div>

                {/* Rating Filter */}
                <div className="mb-6">
                    <label className="block text-lg font-medium mb-2">Rating</label>
                    <div className="flex flex-wrap space-x-6">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <label key={star} className="flex items-center">
                                <input type="radio" name="rating" value={star} className="mr-2" />
                                {star} Star{star > 1 ? 's' : ''}
                            </label>
                        ))}
                    </div>
                </div>

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
                <motion.h2
                    className="text-2xl sm:text-3xl font-bold text-txtPrimary mb-8"
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    {categoryName} Restaurants
                </motion.h2>
                
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                >
                    {/* Dummy Data */}
                    {[...Array(24)].map((_, index) => (
                        <motion.div
                            key={index}
                            className="bg-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                        >
                            <h3 className="text-xl font-bold text-primary mb-3">Restaurant {index + 1}</h3>
                            <p className="text-txtSecondary">Delicious {categoryName} cuisine.</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default CategoryPage;
