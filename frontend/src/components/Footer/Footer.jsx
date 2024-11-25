import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="bg-acent text-primary py-8">
      {/* Container */}
      <div className="container mx-auto px-4">
        {/* Footer Top: Links */}
        <motion.div
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Logo */}
          <motion.div
            className="mb-6 md:mb-0"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-3xl font-bold text-white">ReserveBite</h1>
            <p className="text-sm text-txtSecondary">
              Бързо, лесно и удобно резервирация.
            </p>
          </motion.div>

          {/* Links */}
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 gap-6 text-sm text-primary md:text-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div>
              <h3 className="font-semibold text-white mb-2">Company</h3>
              <ul>
                <li><a href="#about" className="hover:text-txtSecondary">About Us</a></li>
                <li><a href="#careers" className="hover:text-txtSecondary">Careers</a></li>
                <li><a href="#blog" className="hover:text-txtSecondary">Blog</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">Support</h3>
              <ul>
                <li><a href="#help" className="hover:text-txtSecondary">Help Center</a></li>
                <li><a href="#contact" className="hover:text-txtSecondary">Contact Us</a></li>
                <li><a href="#faq" className="hover:text-txtSecondary">FAQs</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-2">Legal</h3>
              <ul>
                <li><a href="#privacy" className="hover:text-txtSecondary">Privacy Policy</a></li>
                <li><a href="#terms" className="hover:text-txtSecondary">Terms of Service</a></li>
              </ul>
            </div>
          </motion.div>
        </motion.div>

        {/* Footer Bottom */}
        <motion.div
          className="flex flex-col md:flex-row justify-between items-center text-sm text-txtSecondary"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <p className="mb-4 md:mb-0">
            © {new Date().getFullYear()} ReserveBite. All Rights Reserved.
          </p>
          <div className="flex space-x-4">
            <motion.a
              href="#facebook"
              aria-label="Facebook"
              className="hover:text-white"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <i className="fab fa-facebook-f"></i>
            </motion.a>
            <motion.a
              href="#twitter"
              aria-label="Twitter"
              className="hover:text-white"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <i className="fab fa-twitter"></i>
            </motion.a>
            <motion.a
              href="#instagram"
              aria-label="Instagram"
              className="hover:text-white"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <i className="fab fa-instagram"></i>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
