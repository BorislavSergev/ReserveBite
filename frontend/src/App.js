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

const App = () => {
  return (
    <div className="app-container">
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Header />
          <div className="app-content">
            <Routes>
              <Route path="/" element={<><Hero /><Category /><About /></>} />
              <Route path="/login" element={<><Login/></>} />
              <Route path="/register" element={<><Register/></>} />


              <Route path="/categories/:categoryName" element={<CategoryPage />} />
            </Routes>
          </div>
          <Footer />
        </Suspense>
      </BrowserRouter>
    </div>
  );
};

export default App;
