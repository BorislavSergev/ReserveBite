import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase'; // Adjust the path based on your project structure

const Category = () => {
    const [categories, setCategories] = useState([]); // State to hold categories data
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    const navigate = useNavigate();

    // Fetch categories from Firestore
    const fetchCategories = async () => {
        try {
            const categoriesCollection = collection(db, 'categories');
            const querySnapshot = await getDocs(categoriesCollection);
            const categoriesData = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setCategories(categoriesData); // Set categories data
            setLoading(false);
        } catch (err) {
            console.error("Error fetching categories:", err);
            setError("Failed to load categories.");
            setLoading(false);
        }
    };

    // Fetch categories on component mount
    useEffect(() => {
        fetchCategories();
    }, []);

    // Handle loading state
    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-gray-500 text-lg">Loading...</p>
            </div>
        );
    }

    // Handle error state
    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-red-500 text-lg">{error}</p>
            </div>
        );
    }

    return (
        <div className="container bg-primary px-4 py-8">
            {/* Section Header */}
            <div className="relative text-center mb-10">
                <div className="relative flex items-center justify-center">
                    <div className="h-1 w-20 bg-secondary rounded-full"></div>
                    <div className="mx-2 text-secondary text-2xl font-extrabold">&#9733;</div>
                    <div className="h-1 w-20 bg-secondary rounded-full"></div>
                </div>
                <motion.h2
                    className="text-3xl md:text-4xl font-bold text-txtPrimary mb-2"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    Explore Categories
                </motion.h2>
                <motion.p
                    className="text-lg md:text-xl text-txtSecondary"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    Discover cuisines from around the world.
                </motion.p>
            </div>

            {/* Categories Grid */}
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:mx-4 sm:mx-1">
                {categories.map((category) => (
                    <motion.div
                        key={category.id}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                        className="relative rounded-lg overflow-hidden h-80 cursor-pointer"
                        style={{
                            backgroundImage: `url(${category.image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                        onClick={() => navigate(`/categories/${category.name}`)}
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.6)] to-[rgba(0,0,0,0)]"></div>
                        <motion.h3
                            className="absolute bottom-4 left-4 text-white text-xl font-bold"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                        >
                            {category.name}
                        </motion.h3>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Category;
