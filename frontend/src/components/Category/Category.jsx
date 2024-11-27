// src/components/Category/Category.jsx

import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const categoriesData = [
    { name: "Italian", imageUrl: "https://amazingfoodanddrink.com/wp-content/uploads/2024/05/The-Flavors-of-Italian-Street-Food_-259434423.jpg" },
    { name: "Greek", imageUrl: "https://kavala-online.com/wp-content/uploads/2024/08/greek-food-plate-1024x585.webp" },
    { name: "Bulgarian", imageUrl: "https://tripjive.com/wp-content/uploads/2024/06/Where-to-eat-traditional-Bulgarian-food-in-Sofia.jpg" },
    { name: "Indian", imageUrl: "https://www.tastingtable.com/img/gallery/20-delicious-indian-dishes-you-have-to-try-at-least-once/intro-1645057933.jpg" },
    { name: "Mexican", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7PrURqk9v5JSOVaUKkSvFgNsqePcWfebTnQ&s" },
];

const Category = () => {
    const navigate = useNavigate();

    return (
        <div className="container bg-primary  px-4">
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
                {categoriesData.map((category) => (
                    <motion.div
                        key={category.name}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                        className="relative rounded-lg overflow-hidden h-80 cursor-pointer"
                        style={{
                            backgroundImage: `url(${category.imageUrl})`,
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
