import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPlus, FaShoppingCart } from 'react-icons/fa';

const MenuPage = () => {
    const [cart, setCart] = useState([]);
    const [selectedMeals, setSelectedMeals] = useState([
        { id: 1, name: 'Pizza Margherita', price: 12 },
        { id: 2, name: 'Caesar Salad', price: 8 },
        { id: 3, name: 'Pasta Carbonara', price: 15 },
        // Add more menu items here
    ]);

    const handleAddToCart = (meal) => {
        setCart([...cart, meal]);
    };

    const handlePlaceOrder = () => {
        alert(`Your order has been placed! Total items: ${cart.length}`);
    };

    return (
        <div className="container mx-auto py-8 px-4 bg-primary">
            <h2 className="text-3xl font-bold text-txtPrimary mb-6">Restaurant Menu</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {selectedMeals.map((meal) => (
                    <motion.div
                        key={meal.id}
                        className="bg-white rounded-lg shadow-lg p-6 hover:scale-105 transition-transform"
                    >
                        <h3 className="text-xl font-bold text-txtPrimary mb-3">{meal.name}</h3>
                        <p className="text-txtSecondary mb-4">${meal.price}</p>
                        <button
                            className="bg-secondary text-white px-4 py-2 rounded-md flex items-center"
                            onClick={() => handleAddToCart(meal)}
                        >
                            <FaPlus className="mr-2" />
                            Add to Cart
                        </button>
                    </motion.div>
                ))}
            </div>

            <div className="mt-8">
                <h3 className="text-lg font-semibold text-txtPrimary">Your Cart</h3>
                <div className="space-y-2">
                    {cart.map((item, index) => (
                        <div key={index} className="flex justify-between text-txtSecondary">
                            <span>{item.name}</span>
                            <span>${item.price}</span>
                        </div>
                    ))}
                </div>

                <motion.button
                    className="bg-primary text-white font-bold py-3 px-6 rounded-md mt-6 w-full"
                    onClick={handlePlaceOrder}
                >
                    Place Order <FaShoppingCart className="ml-2" />
                </motion.button>
            </div>
        </div>
    );
};

export default MenuPage;
