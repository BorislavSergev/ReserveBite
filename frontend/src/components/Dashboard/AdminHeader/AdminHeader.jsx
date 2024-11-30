import React, { useState } from "react";

const Header = () => {
  const [currentRestaurant, setCurrentRestaurant] = useState("Happy");
  const restaurants = ["Happy", "Joyful Bites", "Savory Feast", "Golden Spoon"];

  const handleRestaurantChange = (e) => {
    setCurrentRestaurant(e.target.value);
  };

  return (
    <header className="flex justify-between items-center bg-gradient-to-r from-indigo-500 to-blue-500 p-4 border-b border-gray-300 shadow-lg">
      {/* Left Section: Restaurant Dropdown */}
      <div className="flex items-center">
        <label
          htmlFor="restaurant-select"
          className="text-white font-semibold mr-3"
        >
          Select Restaurant:
        </label>
        <select
          id="restaurant-select"
          value={currentRestaurant}
          onChange={handleRestaurantChange}
          className="bg-white border border-gray-300 text-gray-700 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 hover:ring-2 hover:ring-indigo-500 transition duration-200"
        >
          {restaurants.map((restaurant) => (
            <option key={restaurant} value={restaurant}>
              {restaurant}
            </option>
          ))}
        </select>
      </div>

      {/* Right Section: Navigation */}
      <nav className="flex space-x-6">
        <a
          href="/reservations"
          className="text-white hover:text-yellow-300 font-medium transition duration-200"
        >
          Reservations
        </a>
        <a
          href="/menu"
          className="text-white hover:text-yellow-300 font-medium transition duration-200"
        >
          Menu
        </a>
        <a
          href="/general"
          className="text-white hover:text-yellow-300 font-medium transition duration-200"
        >
          General
        </a>
      </nav>
    </header>
  );
};

export default Header;
