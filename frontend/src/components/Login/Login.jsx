import React from 'react';
import { motion } from 'framer-motion';
import registerImage from '../../assets/images/register.png'; // Replace with your image path

const Login = () => {
  return (
    <div className="flex h-screen">
      {/* Left Column - Image (hidden on small screens) */}
      <div className="w-full lg:w-1/2 bg-cover bg-center hidden lg:block" style={{ backgroundImage: `url(${registerImage})` }}>
        {/* You can also add any animations or overlays to the image */}
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
            Login
          </motion.h2>

          {/* Login Form */}
          <motion.form
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-txtPrimary mb-1">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 border-2 border-primary rounded-md focus:outline-none focus:border-secondary transition duration-300"
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-txtPrimary mb-1">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-3 py-2 border-2 border-primary rounded-md focus:outline-none focus:border-secondary transition duration-300"
              />
            </div>

            {/* Submit Button */}
            <motion.button
              className="w-full py-2 bg-secondary text-primary font-semibold rounded-md hover:bg-acent transition duration-300"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              Login
            </motion.button>
          </motion.form>

          {/* Register Link */}
          <motion.div
            className="mt-4 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <span className="text-txtSecondary">
              Don't have an account?
            </span>
            <a
              href="/register"
              className="ml-2 text-secondary font-semibold"
            >
              Register
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Login;
