import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { db } from '../../firebase'; // Import Firebase Firestore instance
import { collection, getDocs } from 'firebase/firestore';
import Dish2 from '../../assets/images/dish2.png';
import Dish3 from '../../assets/images/dish3.png';

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [restaurants, setRestaurants] = useState([]);
  const [searching, setSearching] = useState(false);

  // Fetch restaurants from Firestore
  const fetchRestaurants = async () => {
    try {
      const restaurantsCollection = collection(db, 'restaurants');
      const snapshot = await getDocs(restaurantsCollection);
      const allRestaurants = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return allRestaurants;
    } catch (error) {
      console.error('Error fetching restaurants:', error);
      return [];
    }
  };

  // Update results dynamically based on search query
  useEffect(() => {
    const filterRestaurants = async () => {
      setSearching(true);

      const allRestaurants = await fetchRestaurants();
      const filteredResults = allRestaurants.filter((restaurant) =>
        restaurant.name?.toLowerCase().includes(searchQuery.toLowerCase())
      );

      setRestaurants(filteredResults);
      setSearching(false);
    };

    if (searchQuery.trim()) {
      filterRestaurants();
    } else {
      setRestaurants([]);
    }
  }, [searchQuery]);

  return (
    <div className="relative w-full h-auto bg-primary overflow-hidden z-10">
      {/* Background Images */}
      <div className="absolute inset-0 flex justify-between mx-2 items-center space-x-8">
        <motion.div
          className="hidden sm:block w-24 sm:w-48 h-24 sm:h-48 rounded-full bg-cover bg-no-repeat overflow-hidden mr-4"
          style={{ backgroundImage: `url(${Dish3})` }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8 }}
          whileHover={{ scale: 1.1 }}
        />
        <motion.div
          className="hidden sm:block w-24 sm:w-48 h-24 sm:h-48 rounded-full bg-cover bg-no-repeat overflow-hidden ml-4"
          style={{ backgroundImage: `url(${Dish2})` }}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          whileHover={{ scale: 1.1 }}
        />
      </div>

      {/* Central Content */}
      <div className="container mx-auto flex flex-col items-center justify-center py-8 px-4">
        <motion.h1
          className="text-lg sm:text-2xl md:text-4xl lg:text-6xl px-4 sm:px-8 font-bold text-center text-txtPrimary mb-4"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          ReserveBite - бързо лесно и удобно резервирация
        </motion.h1>
        <motion.p
          className="text-base sm:text-xl md:text-2xl text-center text-txtSecondary mb-6 sm:mb-8 pt-2"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Намерете най-добрите ресторанти близо до вас и резервирайте маса онлайн.
        </motion.p>

        {/* Search Bar */}
        <motion.div
          className="bg-secondary rounded-full flex items-center w-full sm:w-3/4 lg:w-2/6 relative z-20"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <input
            type="text"
            placeholder="Търсене..."
            className="bg-secondary text-white placeholder-white focus:outline-none rounded-l-full py-3 px-4 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update on every change
          />
          <button
            className="bg-acent text-primary font-semibold py-3 px-6 rounded-r-full h-full"
          >
            Търси
          </button>
        </motion.div>

        {/* Restaurant Results */}
        {searchQuery.trim() && (
          <div className="absolute top-20 w-full sm:w-3/4 lg:w-2/6 mx-auto z-30">
            {searching && <p className="text-white text-center">Търсене...</p>}
            {restaurants.length > 0 && (
              <ul className="bg-white rounded-md shadow-md">
                {restaurants.map((restaurant) => (
                  <li
                    key={restaurant.id}
                    className="border-b last:border-none p-4 text-gray-800 text-center"
                  >
                    {restaurant.name}
                  </li>
                ))}
              </ul>
            )}
            {!searching && searchQuery.trim() && restaurants.length === 0 && (
              <p className="text-white text-center mt-4">Няма намерени резултати.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;
