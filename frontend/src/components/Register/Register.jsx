import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import registerImage from '../../assets/images/register.png'; // Replace with your image path

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await axios.post('http://192.168.22.137:7297/api/users/register', formData);
      setSuccessMessage(response.data.message); // Display success message
      setFormData({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }); // Clear form
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'An error occurred.');
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Column - Image (hidden on small screens) */}
      <div className="w-full lg:w-1/2 bg-cover bg-center hidden lg:block" style={{ backgroundImage: `url(${registerImage})` }}>
        {/* Add optional animations or overlays */}
      </div>

      {/* Right Column - Form */}
      <div className="w-full lg:w-1/2 flex justify-center items-center bg-primary py-6 px-4">
        <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md">
          {/* Title */}
          <motion.h2
            className="text-xl font-bold text-center text-acent mb-6"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Register
          </motion.h2>

          {/* Error/Success Messages */}
          {errorMessage && <div className="text-red-500 text-sm mb-4">{errorMessage}</div>}
          {successMessage && <div className="text-green-500 text-sm mb-4">{successMessage}</div>}

          {/* Register Form */}
          <motion.form
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            onSubmit={handleSubmit}
          >
            {/* First Name Input */}
            <div>
              <label className="block text-sm font-medium text-txtPrimary mb-1">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter your first name"
                className="w-full px-3 py-2 border-2 border-primary rounded-md focus:outline-none focus:border-secondary transition duration-300"
                required
              />
            </div>

            {/* Last Name Input */}
            <div>
              <label className="block text-sm font-medium text-txtPrimary mb-1">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter your last name"
                className="w-full px-3 py-2 border-2 border-primary rounded-md focus:outline-none focus:border-secondary transition duration-300"
                required
              />
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-txtPrimary mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full px-3 py-2 border-2 border-primary rounded-md focus:outline-none focus:border-secondary transition duration-300"
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-txtPrimary mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full px-3 py-2 border-2 border-primary rounded-md focus:outline-none focus:border-secondary transition duration-300"
                required
              />
            </div>

            {/* Confirm Password Input */}
            <div>
              <label className="block text-sm font-medium text-txtPrimary mb-1">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                className="w-full px-3 py-2 border-2 border-primary rounded-md focus:outline-none focus:border-secondary transition duration-300"
                required
              />
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              className="w-full py-2 bg-secondary text-primary font-semibold rounded-md hover:bg-acent transition duration-300"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              Register
            </motion.button>
          </motion.form>

          {/* Login Link */}
          <motion.div
            className="mt-4 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <span className="text-txtSecondary">
              Already have an account?
            </span>
            <a
              href="/login"
              className="ml-2 text-secondary font-semibold"
            >
              Login
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Register;
