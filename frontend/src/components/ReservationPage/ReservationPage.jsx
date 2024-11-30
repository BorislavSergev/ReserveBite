import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';  // Import useParams to read URL params
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaPhoneAlt, FaClock, FaUsers, FaTimes } from 'react-icons/fa';
import Calendar from 'react-calendar';
import { doc, collection, addDoc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
import { db } from '../../firebase';
import { getAuth } from "firebase/auth"; // Import Firebase auth

import './style.css';

const ReservationPage = () => {
    const { id: restaurantId } = useParams(); // Get restaurantId from URL parameter
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [partySize, setPartySize] = useState(2);
    const [reservationDate, setReservationDate] = useState(new Date());
    const [reservationHour, setReservationHour] = useState('');
    const [reservationMinute, setReservationMinute] = useState('');
    const [showOrderConfirmation, setShowOrderConfirmation] = useState(false);
    const [userId, setUserId] = useState(null);

    const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
    const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

    useEffect(() => {
        // Fetch user data when the component mounts
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
            setUserId(user.uid); // Set the userId
            getUserDetails(user.uid);
        }
    }, []);

    const getUserDetails = async (uid) => {
        try {
            const userRef = doc(db, 'users', uid);
            const userDoc = await getDoc(userRef);
            if (userDoc.exists()) {
                const userData = userDoc.data();
                setFirstName(userData.firstName || '');
                setLastName(userData.lastName || '');
                setEmail(userData.email || '');
                setPhone(userData.phone || '');
            } else {
                console.log('No such user document!');
            }
        } catch (error) {
            console.error("Error getting user details:", error);
        }
    };

    const addReservation = async (reservationData, restaurantId, userId) => {
        try {
            const restaurantReservationsRef = collection(db, `restaurants/${restaurantId}/reservations`);
            const reservationDoc = await addDoc(restaurantReservationsRef, reservationData);

            const userRef = doc(db, `users/${userId}`);
            await updateDoc(userRef, {
                reservations: arrayUnion(reservationDoc.id),
            });

            return reservationDoc.id;
        } catch (error) {
            console.error("Error adding reservation: ", error);
            throw error;
        }
    };

    const handleConfirmOrderNow = async () => {
        if (!userId) {
            alert("Please log in to make a reservation.");
            return;
        }

        const reservationData = {
            firstName,
            lastName,
            email,
            phone,
            partySize,
            reservationDate: reservationDate.toISOString(),
            time: `${reservationHour}:${reservationMinute}`,
            mealsOrdered: true,
            status: "confirmed",
        };

        try {
            const reservationId = await addReservation(reservationData, restaurantId, userId);
            alert(`Reservation confirmed with meal order. Reservation ID: ${reservationId}`);
            setShowOrderConfirmation(false); // Close modal
        } catch (error) {
            alert("Failed to confirm reservation.");
        }
    };

    const handleCancelOrderNow = async () => {
        if (!userId) {
            alert("Please log in to make a reservation.");
            return;
        }

        const reservationData = {
            firstName,
            lastName,
            email,
            phone,
            partySize,
            reservationDate: reservationDate.toISOString(),
            time: `${reservationHour}:${reservationMinute}`,
            mealsOrdered: false,
            status: "confirmed",
        };

        try {
            const reservationId = await addReservation(reservationData, restaurantId, userId);
            alert(`Reservation confirmed without meal order. Reservation ID: ${reservationId}`);
            setShowOrderConfirmation(false); // Close modal
        } catch (error) {
            alert("Failed to confirm reservation.");
        }
    };

    return (
        <div className="container mx-auto py-8 px-4 bg-primary">
            <div className="relative mb-8">
                <img
                    src="https://cdn.printnetwork.com/production/assets/themes/5966561450122033bd4456f8/imageLocker/5f206dc35d4bff1ada62fb4c/blog/blog-description/1647973541988_restaurant-banner.png"
                    alt="Restaurant Banner"
                    className="w-full h-64 object-cover rounded-lg shadow-lg"
                />
            </div>

            <h2 className="text-4xl font-bold text-txtPrimary mb-6 mt-6 text-center">
                Reserve a Table
            </h2>

            <motion.div className="bg-white p-6 shadow-xl rounded-3xl max-w-3xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center border-2 border-gray-300 rounded-md p-3 shadow-md focus-within:ring-2 focus-within:ring-primary">
                        <FaUser className="text-secondary mr-3 text-xl" />
                        <input
                            type="text"
                            placeholder="First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="flex-1 outline-none"
                        />
                    </div>
                    <div className="flex items-center border-2 border-gray-300 rounded-md p-3 shadow-md focus-within:ring-2 focus-within:ring-primary">
                        <FaUser className="text-secondary mr-3 text-xl" />
                        <input
                            type="text"
                            placeholder="Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="flex-1 outline-none"
                        />
                    </div>
                    <div className="flex items-center border-2 border-gray-300 rounded-md p-3 shadow-md focus-within:ring-2 focus-within:ring-primary">
                        <FaEnvelope className="text-secondary mr-3 text-xl" />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="flex-1 outline-none"
                        />
                    </div>
                    <div className="flex items-center border-2 border-gray-300 rounded-md p-3 shadow-md focus-within:ring-2 focus-within:ring-primary">
                        <FaPhoneAlt className="text-secondary mr-3 text-xl" />
                        <input
                            type="tel"
                            placeholder="Phone Number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="flex-1 outline-none"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center border-2 border-gray-300 rounded-md p-3 shadow-md focus-within:ring-2 focus-within:ring-primary">
                        <FaUsers className="text-secondary mr-3 text-xl" />
                        <input
                            type="number"
                            min="1"
                            placeholder="Party Size"
                            value={partySize}
                            onChange={(e) => setPartySize(e.target.value)}
                            className="flex-1 outline-none"
                        />
                    </div>

                    <div className="flex items-center border-2 border-gray-300 rounded-md p-3 shadow-md focus-within:ring-2 focus-within:ring-primary">
                        <FaClock className="text-secondary mr-3 text-xl" />
                        <select
                            value={reservationHour}
                            onChange={(e) => setReservationHour(e.target.value)}
                            className="outline-none flex-1"
                        >
                            <option value="">Hour</option>
                            {hours.map((hour) => (
                                <option key={hour} value={hour}>
                                    {hour}
                                </option>
                            ))}
                        </select>

                        <select
                            value={reservationMinute}
                            onChange={(e) => setReservationMinute(e.target.value)}
                            className="outline-none flex-1 ml-2"
                        >
                            <option value="">Minute</option>
                            {minutes.map((minute) => (
                                <option key={minute} value={minute}>
                                    {minute}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Calendar */}
                <div className="mb-6">
                    <Calendar
                        onChange={setReservationDate}
                        value={reservationDate}
                        minDate={new Date()} // Disables past dates
                    />
                </div>

                {/* Confirmation Modal */}
                {showOrderConfirmation && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
                    >
                        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                            <h2 className="text-xl mb-4">Would you like to add a meal order?</h2>
                            <div className="flex justify-between">
                                <button
                                    onClick={handleConfirmOrderNow}
                                    className="px-4 py-2 bg-secondary text-white rounded-md"
                                >
                                    Yes
                                </button>
                                <button
                                    onClick={handleCancelOrderNow}
                                    className="px-4 py-2 bg-acent text-white rounded-md"
                                >
                                    No
                                </button>
                            </div>
                            <button
                                onClick={() => setShowOrderConfirmation(false)}
                                className="absolute top-2 right-2 text-xl text-gray-600"
                            >
                                <FaTimes />
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* Submit Button */}
                <div className="text-center">
                    <button
                        onClick={() => setShowOrderConfirmation(true)} // Show the confirmation modal
                        className="bg-secondary text-white px-6 py-2 rounded-md"
                    >
                        Reserve Table
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default ReservationPage;
