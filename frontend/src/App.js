import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Hero from './components/Hero/Hero';
import Header from './components/Header/Header';
import Category from './components/Category/Category';
import Footer from './components/Footer/Footer';
import About from './components/About/About';
import CategoryPage from './components/CategoryPage/CategoryPage';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import RestaurantDetailPage from './components/RestaurantDetailPage/RestaurantDetailPage ';
import ReservationPage from './components/ReservationPage/ReservationPage'; // Import ReservationPage
import MenuPage from './components/MenuPage/MenuPage'; // Import MenuPage

const App = () => {
  return (
    <div className="app-container">
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Header />
          <div className="app-content">
            <Routes>
              <Route path="/" element={<><Hero /><Category /><About /></>} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/test" element={<RestaurantDetailPage />} />

              {/* Route for CategoryPage */}
              <Route path="/categories/:categoryName" element={<CategoryPage />} />

              {/* Route for Restaurant Detail */}
              <Route path="/restaurant/:restaurantId" element={<RestaurantDetailPage />} />
              
              {/* Route for ReservationPage */}
              <Route path="/reservation" element={<ReservationPage />} />

              {/* Route for MenuPage */}
              <Route path="/menu" element={<MenuPage />} />
            </Routes>
          </div>
          <Footer />
        </Suspense>
      </BrowserRouter>
    </div>
  );
};

export default App;
