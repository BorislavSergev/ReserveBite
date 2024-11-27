import React from 'react';
import { motion } from 'framer-motion';
import Dish2 from '../../assets/images/dish2.png';
import Dish3 from '../../assets/images/dish3.png';

const Hero = () => {
  return (
    <div className="relative w-full h-[60vh] bg-primary overflow-hidden">
      {/* Background Images (Inline Centered) */}
      <div className="absolute inset-0 flex justify-between mx-2 items-center space-x-8">
        <motion.div
          className="w-24 sm:w-48 h-24 sm:h-48 rounded-full bg-cover bg-no-repeat overflow-hidden mr-4"
          style={{
            backgroundImage: `url(${Dish3})`,
          }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8 }}
          whileHover={{ scale: 1.1 }}
        />
        <motion.div
          className="w-24 sm:w-48 h-24 sm:h-48 rounded-full bg-cover bg-no-repeat overflow-hidden ml-4"
          style={{
            backgroundImage: `url(${Dish2})`,
          }}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          whileHover={{ scale: 1.1 }}
        />
      </div>

      {/* Central Content */}
      <div className="container mx-auto flex flex-col items-center justify-center h-full relative z-10 px-4">
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
        <motion.div
          className="bg-secondary rounded-full flex items-center w-full sm:w-3/4 lg:w-2/6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <input
            type="text"
            placeholder="Търсене..."
            className="bg-secondary text-white placeholder-white focus:outline-none rounded-l-full py-3 px-4 w-full"
          />
          <button className="bg-acent text-primary font-semibold py-3 px-6 rounded-r-full h-full">
            Търси
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
