import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { doc, getDoc, getDocs, collection, setDoc } from 'firebase/firestore';
import { db } from '../../firebase'; // Import firebase functions

const RestaurantDetailPage = () => {
    const { id } = useParams(); // Access restaurant ID from the URL parameter
    
    const [restaurant, setRestaurant] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null); // Track selected category for displaying items
    const [menuItems, setMenuItems] = useState([]); // Store the items in the selected category
    const [showCreateMenuItem, setShowCreateMenuItem] = useState(false); // Track if creation form is visible
    const navigate = useNavigate(); // Hook for navigation

    // Fetch restaurant details and its menu categories
    const fetchRestaurantDetails = async () => {
        setLoading(true);
        try {
            // Fetch restaurant details
            const restaurantRef = doc(db, 'restaurants', id); // Reference to restaurant document
            const restaurantSnap = await getDoc(restaurantRef);
            if (restaurantSnap.exists()) {
                setRestaurant(restaurantSnap.data()); // Set restaurant details
            } else {
                setError("Restaurant not found.");
            }

            // Fetch menu categories
            const categoriesRef = collection(db, 'restaurants', id, 'menuCategory');
            const categoriesSnap = await getDocs(categoriesRef);
            const categories = categoriesSnap.docs.map(doc => ({
                id: doc.id,
                name: doc.data().name
            }));
            setRestaurant((prevState) => ({
                ...prevState,
                menuCategories: categories // Set the menu categories
            }));
        } catch (error) {
            console.error("Error fetching restaurant details or menu categories:", error);
            setError("Failed to load restaurant details and categories. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Fetch items based on the selected category
    const fetchItemsByCategory = async (categoryId) => {
        try {
            const itemsRef = collection(db, 'restaurants', id, 'items'); // Reference to items subcollection
            const itemsSnap = await getDocs(itemsRef);

            // Log the fetched items to debug
            console.log('Fetched Items:', itemsSnap.docs);

            const items = itemsSnap.docs
                .map(doc => {
                    const data = doc.data();
                    const category = data.category;  // Access the 'category' field (not 'categoryRef')

                    // Log the item data and category to debug

                    // Check if category exists and is a valid DocumentReference
                    if (category && category.id) {
                        return {
                            id: doc.id,
                            name: data.name,
                            price: data.price,
                            imageUrl: data.imageUrl,
                            description: data.description,
                            category: category,  // Use category directly
                        };
                    } else {
                        return null; // Exclude the item if category is invalid
                    }
                })
                .filter(item => item && item.category.id === categoryId); // Filter items by category.id

            // Log the filtered items to debug

            // Set menuItems with filtered items
            setMenuItems(items);
        } catch (error) {
            setError("Failed to load menu items.");
        }
    };

    useEffect(() => {
        fetchRestaurantDetails(); // Fetch restaurant and its categories
    }, [id]);

    const handleReserveNow = () => {
        console.log(id);
        const restaurantId = id;
        navigate(`/restaurants/${restaurant.id}/reservation`);
    };

    const handleCategoryClick = (category) => {
        setSelectedCategory(category); // Set selected category
        fetchItemsByCategory(category.id); // Fetch items related to the selected category
    };

    const closeMenuItemModal = () => {
        setShowCreateMenuItem(false); // Close the modal
    };

    // Loading and Error States
    if (loading) {
        return <div className="loading-state text-center">Loading restaurant details...</div>;
    }

    if (error) {
        return <div className="error-state text-center text-red-500">{error}</div>;
    }

    // Get categories related to the restaurant
    const categories = Array.isArray(restaurant?.menuCategories) ? restaurant.menuCategories : []; // Ensure it's an array

    return (
        <div className="container mx-auto py-8 px-4 bg-primary relative">
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

            <h2 className="text-3xl font-bold text-txtPrimary mt-6">Menu Categories</h2>

            {/* Display Menu Categories */}
            <motion.div
                className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
            >
                {categories.length > 0 ? (
                    categories.map((category) => (
                        <div
                            key={category.id}
                            className="bg-white rounded-lg shadow-xl p-4 transition-transform transform hover:scale-105"
                            onClick={() => handleCategoryClick(category)} // Handle category click
                        >
                            <h3 className="text-xl font-semibold">{category.name}</h3>
                        </div>
                    ))
                ) : (
                    <p>No categories available.</p>
                )}
            </motion.div>

            {/* Menu Items Section */}
            {selectedCategory && (
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {menuItems.length > 0 ? (
                        menuItems.map((item) => (
                            <div key={item.id} className="bg-white rounded-lg shadow-xl p-4">
                                <img
                                    src={item.imageUrl || "https://via.placeholder.com/150"}  // Placeholder image if no imageUrl
                                    alt={item.name}
                                    className="w-full h-40 object-cover rounded-lg mb-4"
                                />
                                <h3 className="text-lg font-semibold">{item.name}</h3>
                                <p className="text-md text-txtSecondary">{item.description}</p>
                                <span className="text-lg font-bold">${item.price}</span>
                            </div>
                        ))
                    ) : (
                        <p>No items available in this category.</p>
                    )}
                </div>
            )}

            {/* Reservation Button */}
            <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-full max-w-xs p-4">
                <button
                    onClick={handleReserveNow}
                    className="bg-secondary text-white font-bold py-3 px-6 rounded-lg w-full shadow-lg hover:bg-secondaryHover transition"
                >
                    Make Reservation
                </button>
            </div>
        </div>
    );
};

export default RestaurantDetailPage;
