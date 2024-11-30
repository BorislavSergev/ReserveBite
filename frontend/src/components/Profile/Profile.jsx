import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaEdit, FaSave } from "react-icons/fa";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../../firebase"; // Adjust the import based on your project structure

const Profile = () => {
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState(null); // Default to null
  const [formData, setFormData] = useState(null); // Default to null
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const auth = getAuth();

  // Fetch user profile data from Firestore
  const fetchProfile = async (uid) => {
    try {
      setLoading(true);
      const userDoc = doc(db, "users", uid);
      const docSnap = await getDoc(userDoc);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setProfile(data);
        setFormData(data); // Initialize formData with profile data
      } else {
        console.error("No user profile found in Firestore for this UID.");
        setError("No profile found.");
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
      setError("Failed to load profile.");
    } finally {
      setLoading(false);
    }
  };

  // Save updated profile data to Firestore
  const handleSave = async () => {
    try {
      const userDoc = doc(db, "users", auth.currentUser.uid);
      await setDoc(userDoc, formData, { merge: true });
      setProfile(formData);
      setEditing(false);
    } catch (error) {
      console.error("Error saving user profile:", error);
      setError("Failed to save changes.");
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // React to Auth State Changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchProfile(user.uid);
      } else {
        setError("No authenticated user.");
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-4 bg-primary min-h-screen flex justify-center items-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md bg-white rounded-lg shadow-lg p-6"
      >
        <div className="flex flex-col items-center mb-6">
          <motion.h2
            className="text-2xl font-bold text-gray-800 mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            {profile.first_name} {profile.last_name}
          </motion.h2>

          <motion.p
            className="text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            {profile.email}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <div className="space-y-4">
            {/* First Name */}
            <div>
              <label className="block text-gray-700 font-bold">First Name</label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name || ""}
                onChange={handleInputChange}
                disabled={!editing}
                className={`w-full p-2 rounded-md border ${
                  editing ? "border-purple-500 bg-white" : "border-gray-300 bg-gray-100"
                }`}
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-gray-700 font-bold">Last Name</label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name || ""}
                onChange={handleInputChange}
                disabled={!editing}
                className={`w-full p-2 rounded-md border ${
                  editing ? "border-purple-500 bg-white" : "border-gray-300 bg-gray-100"
                }`}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700 font-bold">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email || ""}
                onChange={handleInputChange}
                disabled={!editing}
                className={`w-full p-2 rounded-md border ${
                  editing ? "border-purple-500 bg-white" : "border-gray-300 bg-gray-100"
                }`}
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-gray-700 font-bold">Phone Number</label>
              <input
                type="text"
                name="phone_number"
                value={formData.phone_number || ""}
                onChange={handleInputChange}
                disabled={!editing}
                className={`w-full p-2 rounded-md border ${
                  editing ? "border-purple-500 bg-white" : "border-gray-300 bg-gray-100"
                }`}
              />
            </div>
          </div>

          {/* Edit/Save Button */}
          <motion.div
            className="mt-6 flex justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            {editing ? (
              <button
                onClick={handleSave}
                className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-green-600 transition-colors"
              >
                <FaSave />
                <span>Save Changes</span>
              </button>
            ) : (
              <button
                onClick={() => setEditing(true)}
                className="bg-secondary text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-secondaryHover transition-colors"
              >
                <FaEdit />
                <span>Edit Profile</span>
              </button>
            )}
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Profile;
