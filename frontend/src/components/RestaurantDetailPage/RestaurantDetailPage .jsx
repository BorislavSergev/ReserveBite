import React, { useState, useEffect } from 'react';
import { FaStar, FaInfoCircle, FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom'; // Import useParams hook to get the ID
import axios from 'axios';

const RestaurantDetailPage = () => {
    const { id } = useParams(); // Access restaurant ID from the URL parameter
    const [restaurant, setRestaurant] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState("Special Offers");
    const [selectedMeal, setSelectedMeal] = useState(null); // Track selected meal for dialog
    const navigate = useNavigate(); // Hook for navigation

    // Fetch the restaurant details using the ID from the URL
    useEffect(() => {
        console.log("Restaurant ID:", id);
        const fetchRestaurantDetails = async () => {
            try {
                const response = await axios.get(`https://api.swiftabook.com/api/restaurants/get-restaurant/${id}`);
                setRestaurant(response.data);
            } catch (error) {
                console.error("Error fetching restaurant details:", error);
            }
        };
    
        fetchRestaurantDetails();
    }, [id]);

    // Handle category selection
    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
    };

    const handleReserveNow = () => {
        navigate('/reservation'); // Directly navigate to reservation page
    };

    const openMealInfo = (meal) => {
        setSelectedMeal(meal); // Set the selected meal to display in the dialog
    };

    const closeMealInfo = () => {
        setSelectedMeal(null); // Close the dialog
    };

    // Return loading state if the restaurant data hasn't been fetched yet
    if (!restaurant) {
        return (
            <div className="loading-state">
                Loading restaurant details...
            </div>
        );
    }

    // Check if menu categories are available for the restaurant
    const categories = restaurant.menu ? Object.keys(restaurant.menu) : [];
    const menuItems = restaurant.menu && restaurant.menu[selectedCategory] ? restaurant.menu[selectedCategory] : [];

    return (
        <div className="container justify-center mx-auto py-8 px-4 bg-primary relative">
            {/* Restaurant Banner */}
            <div className="relative">
                <img
                    src={restaurant.imageUrl || "https://cdn.printnetwork.com/production/assets/themes/5966561450122033bd4456f8/imageLocker/5f206dc35d4bff1ada62fb4c/blog/blog-description/1647973541988_restaurant-banner.png"}
                    alt="Restaurant Banner"
                    className="w-full h-64 object-cover rounded-lg"
                />
            </div>

            {/* Restaurant Information */}
            <motion.div
                className="bg-white rounded-lg shadow-xl mt-6 p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                <h1 className="text-4xl font-bold">{restaurant.name}</h1>
                <div className="flex items-center mt-2">
                    <FaStar className="text-yellow-500" />
                    <span className="ml-1 text-lg">{restaurant.rating}</span>
                </div>
                <p className="text-lg text-txtSecondary mb-4">{restaurant.description}</p>
            </motion.div>

            <h2 className="text-3xl font-bold text-txtPrimary mt-6">Menu</h2>

            {/* Category Chips */}
            <div className="flex flex-wrap mt-2">
                {categories.map((category, index) => (
                    <span
                        key={index}
                        className={`cursor-pointer rounded-full py-1 px-4 text-sm mr-3 mb-3 text-center text-white  ${selectedCategory === category ? "bg-secondary font-semibold" : "bg-acent text-white"}`}
                        onClick={() => handleCategorySelect(category)}
                    >
                        {category}
                    </span>
                ))}
            </div>

            {/* Menu Section with Grid Layout */}
            <motion.div
                className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
            >
                {menuItems.length > 0 ? (
                    menuItems.map((item, index) => (
                        <div key={index} className="bg-white rounded-lg shadow-xl p-4">
                            <img src={item.image} alt={item.name} className="w-full h-32 object-cover rounded-lg mb-4" />
                            <h3 className="text-lg font-semibold">{item.name}</h3>
                            <p className="text-sm text-txtSecondary line-clamp-2">{item.description}</p>
                            
                            {/* Move Info Button below the description */}
                            <div className="mt-4 flex justify-between items-center">
                                <span className="text-sm text-accent font-semibold">{item.price}</span>
                                <button
                                    onClick={() => openMealInfo(item)}
                                    className="text-blue-500 hover:text-blue-700"
                                >
                                    <FaInfoCircle size={20} />
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No items available in this category.</p>
                )}
            </motion.div>

            {/* Reserve Now Button */}
            <button
                onClick={handleReserveNow}
                className="bg-acent text-white py-3 px-6 rounded-full w-full mt-8 hover:bg-secondary transition transform hover:scale-95 shadow-lg"
            >
                Reserve Now
            </button>

            {/* Modal for Meal Info */}
            {selectedMeal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl w-11/12 md:w-1/2 relative">
                        {/* Close Button (FaTimes Icon) */}
                        <button
                            onClick={closeMealInfo}
                            className="absolute top-2 right-2 text-xl text-gray-600 hover:text-gray-900"
                        >
                            <FaTimes size={24} />
                        </button>

                        <h3 className="text-2xl font-semibold mb-4">{selectedMeal.name}</h3>
                        <img src={selectedMeal.image} alt={selectedMeal.name} className="w-full h-48 object-cover rounded-lg mb-4" />
                        <h4 className="text-lg font-semibold mb-2">Ingredients</h4>
                        <ul className="list-disc pl-5">
                            {selectedMeal.ingredients?.map((ingredient, index) => (
                                <li key={index}>{ingredient}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RestaurantDetailPage;
