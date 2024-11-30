import React, { useState } from "react";
import { FaCalendarAlt, FaEdit, FaMapMarkerAlt, FaTrash } from "react-icons/fa";

const SelectRestaurant = () => {
  const [selectedRestaurant, setSelectedRestaurant] = useState("");
  const [restaurants, setRestaurants] = useState([
    {
      id: 1,
      name: "Bella Italia",
      description: "Authentic Italian cuisine with a cozy atmosphere.",
      creationDate: "2023-10-05",
      bannerImage: "https://via.placeholder.com/400x200/ff7f7f/333333?text=Bella+Italia",
    },
    {
      id: 2,
      name: "Sushi House",
      description: "Fresh sushi and sashimi prepared with care.",
      creationDate: "2022-08-12",
      bannerImage: "https://via.placeholder.com/400x200/7f9dff/333333?text=Sushi+House",
    },
    {
      id: 3,
      name: "Le Bistro",
      description: "French gourmet food with a modern twist.",
      creationDate: "2021-05-21",
      bannerImage: "https://via.placeholder.com/400x200/ffe57f/333333?text=Le+Bistro",
    },
  ]);

  const handleSelectRestaurant = (e) => {
    setSelectedRestaurant(e.target.value);
  };

  const handleCreateNewRestaurant = () => {
    alert("Create New Restaurant");
  };

  const handleDeleteRestaurant = (id) => {
    setRestaurants(restaurants.filter((restaurant) => restaurant.id !== id));
  };

  return (
    <div className="container mx-auto py-12 px-4 bg-primary min-h-screen">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        {/* Left Side: Select Restaurant */}
        <div>
          <h1 className="text-xl font-semibold text-white">Select Restaurant to Manage</h1>
        </div>

        {/* Right Side: Create New Restaurant Button */}
        <div>
          <button
            onClick={handleCreateNewRestaurant}
            className="bg-secondary text-white px-6 py-3 rounded-lg hover:bg-acent transition-colors"
          >
            Create New Restaurant
          </button>
        </div>
      </div>

      {/* Restaurant Grid Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {restaurants.map((restaurant) => (
          <div
            key={restaurant.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
          >
            <div
              className="w-full h-56 bg-cover bg-center"
              style={{ backgroundImage: `url(${restaurant.bannerImage})` }}
            ></div>

            <div className="p-4">
              <h2 className="text-xl font-bold text-gray-800">{restaurant.name}</h2>
              <p className="text-sm text-gray-500">{restaurant.description}</p>
              <p className="text-sm text-gray-400 mt-2">
                <FaCalendarAlt className="inline-block mr-1" />
                {restaurant.creationDate}
              </p>

              {/* Action Buttons (Edit and Delete) */}
              <div className="flex space-x-4 mt-4">
                <button className="bg-secondary text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-acent transition-colors">
                  <FaEdit />
                  <span>Edit</span>
                </button>

                <button
                  onClick={() => handleDeleteRestaurant(restaurant.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-red-600 transition-colors"
                >
                  <FaTrash />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectRestaurant;
